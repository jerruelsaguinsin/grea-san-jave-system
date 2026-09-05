// printer data — no predefined array, all read dynamically from HTML
let printers = [];
let printJobs = JSON.parse(localStorage.getItem("printJobs")) || [];

// save data
function saveData() {
    localStorage.setItem("printers", JSON.stringify(printers));
    localStorage.setItem("printJobs", JSON.stringify(printJobs));
}

// initialize printers — reads name, type, status directly from HTML elements
function initializePrinters() {
    const printerCards = document.querySelectorAll(".printer-item");
    const savedPrinters = JSON.parse(localStorage.getItem("printers")) || [];
    printers = [];

    printerCards.forEach(function (card, index) {
        const name = card.dataset.printer ||
            (card.querySelector(".printer-name") ? card.querySelector(".printer-name").textContent.trim() : "");
        const type = card.querySelector(".printer-type") ?
            card.querySelector(".printer-type").textContent.trim() : "";
        const statusSelect = card.querySelector(".printer-status");
        const savedStatus = savedPrinters[index] ? savedPrinters[index].status : null;
        const status = savedStatus || (statusSelect ? statusSelect.value : "Idle");

        printers.push({ id: index + 1, name: name, type: type, status: status });

        if (statusSelect) {
            statusSelect.value = status;
            statusSelect.addEventListener("change", function () {
                printers[index].status = statusSelect.value;
                saveData();
                updateSummary();
                updateQueue();
            });
        }
    });

    saveData();
    updateSummary();
    updateQueue();
}

// find printer
function getPrinterByName(name) {
    return printers.find(function (printer) {
        return printer.name.toLowerCase() === name.toLowerCase();
    });
}

// update summary
function updateSummary() {
    const totalPrinters = printers.filter(function (p) { return p.name.trim() !== ""; }).length;
    const availablePrinters = printers.filter(function (p) { return p.name.trim() !== "" && p.status.toLowerCase() === "idle"; }).length;
    const printingPrinters = printers.filter(function (p) { return p.name.trim() !== "" && p.status.toLowerCase() === "printing"; }).length;
    const unavailablePrinters = totalPrinters - availablePrinters - printingPrinters;

    document.getElementById("totalPrinters").textContent = totalPrinters;
    document.getElementById("availablePrinters").textContent = availablePrinters;
    document.getElementById("printingPrinters").textContent = printingPrinters;
    document.getElementById("unavailablePrinters").textContent = unavailablePrinters;
}

// open modal
function openJobModal() {
    document.getElementById("jobModal").style.display = "flex";
    document.getElementById("customerName").focus();
}

// close modal
function closeJobModal() {
    document.getElementById("jobModal").style.display = "none";
    document.getElementById("customerName").value = "";
    document.getElementById("printType").value = "";
    document.getElementById("copies").value = "";
    document.getElementById("printingSize").value = "";
    document.getElementById("jobPrinter").value = "";
    document.getElementById("priority").value = "";
    document.getElementById("jobNote").value = "";
}

// printer options
function updatePrinterOptions() {
    const printerInput = document.getElementById("jobPrinter");
    if (!printerInput) return;
    printerInput.placeholder = "Enter printer name or leave blank for auto assign";
}

// find available printer
function findAvailablePrinter() {
    return printers.find(function (p) { return p.name.trim() !== "" && p.status.toLowerCase() === "idle"; });
}

// create job
function createPrintJob() {
    const customerName = document.getElementById("customerName").value.trim();
    const printType = document.getElementById("printType").value.trim();
    const copies = parseInt(document.getElementById("copies").value);
    const printingSize = document.getElementById("printingSize").value.trim();
    const printerName = document.getElementById("jobPrinter").value.trim();
    const priority = document.getElementById("priority").value.trim();
    const note = document.getElementById("jobNote").value.trim();

    if (customerName === "" || printType === "" || !copies || copies < 1 || printingSize === "" || priority === "") {
        alert("Please complete all required fields.");
        return;
    }

    let assignedPrinter = null;
    let jobStatus = "Queued";

    if (printerName !== "") {
        assignedPrinter = getPrinterByName(printerName);
        if (!assignedPrinter) {
            alert("Printer not found.");
            return;
        }
        if (assignedPrinter.status.toLowerCase() === "idle") {
            assignedPrinter.status = "Printing";
            jobStatus = "Printing";
        }
    } else {
        assignedPrinter = findAvailablePrinter();
        if (assignedPrinter) {
            assignedPrinter.status = "Printing";
            jobStatus = "Printing";
        }
    }

    const newJob = {
        id: Date.now(),
        customer: customerName,
        printType: printType,
        copies: copies,
        printingSize: printingSize,
        printer: assignedPrinter ? assignedPrinter.name : "Unassigned",
        priority: priority,
        status: jobStatus,
        note: note,
        date: new Date().toLocaleString()
    };

    printJobs.push(newJob);
    saveData();
    updateSummary();
    updateQueue();
    syncPrinterCards();
    closeJobModal();
}

// assign job
function assignJob(jobId) {
    const job = printJobs.find(function (item) { return item.id === jobId; });
    if (!job) return;

    const availablePrinter = findAvailablePrinter();
    if (!availablePrinter) {
        alert("No available printer.");
        return;
    }

    job.printer = availablePrinter.name;
    job.status = "Printing";
    availablePrinter.status = "Printing";

    saveData();
    updateSummary();
    updateQueue();
    syncPrinterCards();
}

// complete job
function completeJob(jobId) {
    const job = printJobs.find(function (item) { return item.id === jobId; });
    if (!job) return;

    if (job.printer !== "Unassigned") {
        const printer = getPrinterByName(job.printer);
        if (printer) printer.status = "Idle";
    }

    job.status = "Completed";
    saveData();
    updateSummary();
    updateQueue();
    syncPrinterCards();
}

// remove job
function removeJob(jobId) {
    printJobs = printJobs.filter(function (job) { return job.id !== jobId; });
    saveData();
    updateQueue();
}

// keep printer card dropdowns in sync with printers[] array
function syncPrinterCards() {
    const printerCards = document.querySelectorAll(".printer-item");
    printerCards.forEach(function (card, index) {
        const statusSelect = card.querySelector(".printer-status");
        if (statusSelect && printers[index]) {
            statusSelect.value = printers[index].status;
        }
    });
}

// update queue
function updateQueue() {
    const queueBody = document.getElementById("queue-table-body");
    if (!queueBody) return;

    queueBody.innerHTML = "";

    if (printJobs.length === 0) {
        queueBody.innerHTML = `
            <tr class="empty-row" id="empty-row">
                <td colspan="9">No print jobs yet. Click "Assign Print Job" to add.</td>
            </tr>
        `;
        return;
    }

    printJobs.forEach(function (job) {
        const row = document.createElement("tr");
        let actionButtons = "";

        if (job.status === "Queued") {
            actionButtons += `<button class="btn btn-sm" onclick="assignJob(${job.id})">Assign</button>`;
        }
        if (job.status === "Printing") {
            actionButtons += `<button class="btn btn-sm" onclick="completeJob(${job.id})">Complete</button>`;
        }
        actionButtons += `<button class="btn btn-danger btn-sm" onclick="removeJob(${job.id})">Remove</button>`;

        row.innerHTML = `
            <td>${job.printType}</td>
            <td>${job.customer}</td>
            <td>${job.copies}</td>
            <td>${job.printer}</td>
            <td>${job.printingSize}</td>
            <td>${job.priority}</td>
            <td>${job.status}</td>
            <td>${job.note || "-"}</td>
            <td>${actionButtons}</td>
        `;

        queueBody.appendChild(row);
    });
}

// update status (called externally if needed)
function updatePrinterStatus(index, status) {
    if (!printers[index]) return;
    printers[index].status = status;
    saveData();
    updateSummary();
    updateQueue();
    syncPrinterCards();
}

// reset data
function resetPrintJobData() {
    localStorage.removeItem("printers");
    localStorage.removeItem("printJobs");
    location.reload();
}

// export log
function exportLog() {
    const printerData = printers.map(function (printer) {
        return { ID: printer.id, "Printer Name": printer.name, "Printer Type": printer.type, Status: printer.status };
    });

    const jobData = printJobs.map(function (job) {
        return {
            ID: job.id, Customer: job.customer, "Print Type": job.printType, Copies: job.copies,
            "Printing Size": job.printingSize, Printer: job.printer, Priority: job.priority,
            Status: job.status, Note: job.note || "-", Date: job.date
        };
    });

    const summaryData = [{
        "Total Printers": document.getElementById("totalPrinters").textContent,
        Available: document.getElementById("availablePrinters").textContent,
        Printing: document.getElementById("printingPrinters").textContent,
        Unavailable: document.getElementById("unavailablePrinters").textContent
    }];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(printerData), "Printers");
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(jobData), "Print Jobs");
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(summaryData), "Summary");
    XLSX.writeFile(workbook, "Print_Job_Log.xlsx");
}

// page load
document.addEventListener("DOMContentLoaded", function () {
    initializePrinters();
    updatePrinterOptions();
});
