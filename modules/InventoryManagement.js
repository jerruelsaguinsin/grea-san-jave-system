// inventory data via linked list
function InventoryNode(id, name, quantity, unit, threshold) {
    this.id = id;
    this.name = name;
    this.quantity = quantity;
    this.unit = unit;
    this.threshold = threshold;
    this.next = null;
}

let stockItems = {
    head: null,
    tail: null,
    size: 0
};


// order data via link list
function OrderNode(id, customer, customerType, description, status) {
    this.id = id;
    this.customer = customer;
    this.customerType = customerType;
    this.description = description;
    this.status = status;
    this.next = null;
}

let orderItems = {
    head: null,
    tail: null,
    size: 0
};


// save data
function saveData() {
    const inventoryData = {
        head: null,
        tail: null,
        size: stockItems.size,
        nodes: {}
    };

    let currentStock = stockItems.head;

    while (currentStock !== null) {
        inventoryData.nodes[currentStock.id] = {
            id: currentStock.id,
            name: currentStock.name,
            quantity: currentStock.quantity,
            unit: currentStock.unit,
            threshold: currentStock.threshold,
            next: currentStock.next
                ? currentStock.next.id
                : null
        };

        currentStock = currentStock.next;
    }

    inventoryData.head = stockItems.head
        ? stockItems.head.id
        : null;

    inventoryData.tail = stockItems.tail
        ? stockItems.tail.id
        : null;


    const ordersData = {
        head: null,
        tail: null,
        size: orderItems.size,
        nodes: {}
    };

    let currentOrder = orderItems.head;

    while (currentOrder !== null) {
        ordersData.nodes[currentOrder.id] = {
            id: currentOrder.id,
            customer: currentOrder.customer,
            customerType: currentOrder.customerType,
            description: currentOrder.description,
            status: currentOrder.status,
            next: currentOrder.next
                ? currentOrder.next.id
                : null
        };

        currentOrder = currentOrder.next;
    }

    ordersData.head = orderItems.head
        ? orderItems.head.id
        : null;

    ordersData.tail = orderItems.tail
        ? orderItems.tail.id
        : null;


    localStorage.setItem(
        "inventoryItems",
        JSON.stringify(inventoryData)
    );

    localStorage.setItem(
        "inventoryOrders",
        JSON.stringify(ordersData)
    );
}


// load data
function loadData() {
    const savedInventory =
        JSON.parse(localStorage.getItem("inventoryItems"));

    const savedOrders =
        JSON.parse(localStorage.getItem("inventoryOrders"));


    // load inventory data
    if (
        savedInventory &&
        savedInventory.nodes &&
        savedInventory.head !== null
    ) {
        let currentID = savedInventory.head;

        while (currentID !== null) {
            const item =
                savedInventory.nodes[currentID];

            if (!item) break;

            const newNode = new InventoryNode(
                item.id,
                item.name,
                Number(item.quantity),
                item.unit,
                Number(item.threshold)
            );

            if (stockItems.head === null) {
                stockItems.head = newNode;
                stockItems.tail = newNode;
            } else {
                stockItems.tail.next = newNode;
                stockItems.tail = newNode;
            }

            stockItems.size++;

            currentID = item.next;
        }
    }


    // load order data
    if (
        savedOrders &&
        savedOrders.nodes &&
        savedOrders.head !== null
    ) {
        let currentID = savedOrders.head;

        while (currentID !== null) {
            const order =
                savedOrders.nodes[currentID];

            if (!order) break;

            const newNode = new OrderNode(
                order.id,
                order.customer,
                order.customerType,
                order.description,
                order.status
            );

            if (orderItems.head === null) {
                orderItems.head = newNode;
                orderItems.tail = newNode;
            } else {
                orderItems.tail.next = newNode;
                orderItems.tail = newNode;
            }

            orderItems.size++;

            currentID = order.next;
        }
    }
}


// simple id generator
function createID() {
    return Date.now() + Math.floor(Math.random() * 1000);
}


// escape text before inserting into HTML
function escapeHTML(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}


// toggle sidebar
function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle("collapsed");
}


// toggle sidebar on mobile
function toggleMobileSidebar() {
    document.getElementById("sidebar").classList.toggle("mobile-open");
}


// show toast
function showToast(message, type) {
    const host = document.getElementById("toastHost");
    const toast = document.createElement("div");

    toast.className = "toast" + (type ? " toast-" + type : "");
    toast.textContent = message;
    host.appendChild(toast);

    setTimeout(function () {
        toast.remove();
    }, 2400);
}


// open stock modal
function openStockModal() {
    const modal = document.getElementById("stockModal");

    modal.hidden = false;
    modal.style.display = "";

    document.getElementById("stockName").value = "";
    document.getElementById("stockQuantity").value = "";
    document.getElementById("stockUnit").value = "";
    document.getElementById("stockThreshold").value = "";

    document.getElementById("stockName").focus();
}


// close stock modal
function closeStockModal() {
    const modal = document.getElementById("stockModal");

    modal.hidden = true;
    modal.style.display = "none";
}


// add stock item
function addStockItem() {
    const name =
        document.getElementById("stockName").value.trim();

    const quantity =
        document.getElementById("stockQuantity").value;

    const unit =
        document.getElementById("stockUnit").value.trim();

    const threshold =
        document.getElementById("stockThreshold").value;


    if (name === "") {
        showToast("Please enter an item name.", "error");
        return;
    }

    if (quantity === "") {
        showToast("Please enter the quantity.", "error");
        return;
    }

    if (Number(quantity) < 0) {
        showToast("Quantity cannot be negative.", "error");
        return;
    }

    if (unit === "") {
        showToast("Please enter the unit.", "error");
        return;
    }

    if (threshold === "") {
        showToast("Please enter the threshold.", "error");
        return;
    }

    if (Number(threshold) < 0) {
        showToast("Threshold cannot be negative.", "error");
        return;
    }


    // create new inventory node
    const newNode = new InventoryNode(
        createID(),
        name,
        Number(quantity),
        unit,
        Number(threshold)
    );


    // add node to linked list
    if (stockItems.head === null) {
        stockItems.head = newNode;
        stockItems.tail = newNode;
    } else {
        stockItems.tail.next = newNode;
        stockItems.tail = newNode;
    }

    stockItems.size++;


    saveData();
    renderStock();
    renderAlerts();
    renderStats();
    closeStockModal();

    showToast("Inventory item added.", "success");
}


// render stock table
function renderStock() {
    const tbody =
        document.getElementById("stockTableBody");

    const search =
        document.getElementById("stockSearch")
            .value
            .toLowerCase();

    tbody.innerHTML = "";

    let current = stockItems.head;
    let visibleCount = 0;

    while (current !== null) {

        if (
            search === "" ||
            current.name.toLowerCase().indexOf(search) !== -1
        ) {

            let statusClass = "badge-instock";
            let statusLabel = "In Stock";

            if (current.quantity <= 0) {
                statusClass = "badge-outofstock";
                statusLabel = "Out of Stock";
            } else if (
                current.quantity <= current.threshold
            ) {
                statusClass = "badge-lowstock";
                statusLabel = "Low Stock";
            }


            const row =
                document.createElement("tr");

            row.innerHTML = `
                <td>
                    ${escapeHTML(current.name)}
                </td>

                <td class="mono">
                    ${current.quantity}
                </td>

                <td>
                    ${escapeHTML(current.unit)}
                </td>

                <td class="mono">
                    ${current.threshold}
                </td>

                <td>
                    <span class="badge ${statusClass}">
                        ${statusLabel}
                    </span>
                </td>

                <td>
                    <div class="row-actions">

                        <button
                            class="icon-btn"
                            onclick="decreaseStock(${current.id})"
                            aria-label="Decrease"
                            title="-1"
                        >
                            −
                        </button>

                        <input
                            type="number"
                            class="input input-sm stock-quantity-input"
                            value="${current.quantity}"
                            min="0"
                            onchange="changeStockQuantity(${current.id}, this.value)"
                            style="width:55px; text-align:center;"
                        >

                        <button
                            class="icon-btn"
                            onclick="increaseStock(${current.id})"
                            aria-label="Increase"
                            title="+1"
                        >
                            +
                        </button>

                        <button
                            class="icon-btn"
                            onclick="deleteStock(${current.id})"
                            aria-label="Remove"
                            title="Remove"
                        >
                            🗑
                        </button>

                    </div>
                </td>
            `;

            tbody.appendChild(row);

            visibleCount++;
        }

        current = current.next;
    }


    if (visibleCount === 0) {

        const row =
            document.createElement("tr");

        row.className = "empty-row";

        const cell =
            document.createElement("td");

        cell.colSpan = 6;

        if (stockItems.size === 0) {
            cell.textContent =
                'No inventory items yet. Click "New Item" to add.';
        } else {
            cell.textContent =
                "No items match your search.";
        }

        row.appendChild(cell);
        tbody.appendChild(row);
    }
}


// increase stock
function increaseStock(id) {
    let current = stockItems.head;

    while (current !== null) {

        if (current.id === id) {

            current.quantity++;

            saveData();
            renderStock();
            renderAlerts();
            renderStats();

            return;
        }

        current = current.next;
    }
}


// decrease stock
function decreaseStock(id) {
    let current = stockItems.head;

    while (current !== null) {

        if (current.id === id) {

            if (current.quantity > 0) {
                current.quantity--;
            }

            saveData();
            renderStock();
            renderAlerts();
            renderStats();

            return;
        }

        current = current.next;
    }
}


// change stock quantity manually
function changeStockQuantity(id, quantity) {

    quantity = String(quantity).trim();

    if (quantity === "") {
        showToast("Please enter a quantity.", "error");
        renderStock();
        return;
    }

    if (Number(quantity) < 0) {
        showToast("Quantity cannot be negative.", "error");
        renderStock();
        return;
    }


    let current = stockItems.head;

    while (current !== null) {

        if (current.id === id) {

            current.quantity = Number(quantity);

            saveData();
            renderStock();
            renderAlerts();
            renderStats();

            return;
        }

        current = current.next;
    }
}


// remove stock item
function deleteStock(id) {

    if (!confirm("Remove this inventory item?")) return;

    if (stockItems.head === null) {
        return;
    }


    // remove head node
    if (stockItems.head.id === id) {

        stockItems.head =
            stockItems.head.next;

        if (stockItems.head === null) {
            stockItems.tail = null;
        }

        stockItems.size--;

        saveData();
        renderStock();
        renderAlerts();
        renderStats();

        showToast(
            "Inventory item removed.",
            "success"
        );

        return;
    }


    // search previous node
    let current = stockItems.head;

    while (current.next !== null) {

        if (current.next.id === id) {

            if (current.next === stockItems.tail) {
                stockItems.tail = current;
            }

            current.next =
                current.next.next;

            stockItems.size--;

            saveData();
            renderStock();
            renderAlerts();
            renderStats();

            showToast(
                "Inventory item removed.",
                "success"
            );

            return;
        }

        current = current.next;
    }
}


// open order modal
function openOrderModal() {
    const modal = document.getElementById("orderModal");

    modal.hidden = false;
    modal.style.display = "";

    document.getElementById("orderCustomer").value = "";
    document.getElementById("customerType").value = "";
    document.getElementById("orderDescription").value = "";
    document.getElementById("orderStatus").value = "";

    document.getElementById("orderCustomer").focus();
}


// close order modal
function closeOrderModal() {
    const modal = document.getElementById("orderModal");

    modal.hidden = true;
    modal.style.display = "none";
}


// create order
function addOrder() {

    const customer =
        document.getElementById("orderCustomer")
            .value
            .trim();

    const customerType =
        document.getElementById("customerType")
            .value
            .trim();

    const description =
        document.getElementById("orderDescription")
            .value
            .trim();

    const status =
        document.getElementById("orderStatus")
            .value
            .trim();


    if (customer === "") {
        showToast(
            "Please enter customer name.",
            "error"
        );

        return;
    }

    if (customerType === "") {
        showToast(
            "Please enter customer type.",
            "error"
        );

        return;
    }

    if (description === "") {
        showToast(
            "Please enter order description.",
            "error"
        );

        return;
    }

    if (status === "") {
        showToast(
            "Please enter a status.",
            "error"
        );

        return;
    }


    // create new order node
    const newNode = new OrderNode(
        createID(),
        customer,
        customerType,
        description,
        status
    );


    // add node to linked list
    if (orderItems.head === null) {
        orderItems.head = newNode;
        orderItems.tail = newNode;
    } else {
        orderItems.tail.next = newNode;
        orderItems.tail = newNode;
    }

    orderItems.size++;


    saveData();

    // close modal
    closeOrderModal();

    renderOrders();
    renderStats();
    updateCustomerOptions();

    showToast(
        "Order created.",
        "success"
    );
}


// render order table
function renderOrders() {

    const tbody =
        document.getElementById("orderTableBody");

    tbody.innerHTML = "";


    if (orderItems.size === 0) {

        tbody.innerHTML = `
            <tr class="empty-row" id="orderEmpty">
                <td colspan="5">
                    No orders yet. Click "New Order" to add.
                </td>
            </tr>
        `;

        return;
    }


    let current = orderItems.head;

    while (current !== null) {

        const row =
            document.createElement("tr");

        row.innerHTML = `
            <td>
                ${escapeHTML(current.customer)}
            </td>

            <td>
                ${escapeHTML(current.customerType)}
            </td>

            <td>
                ${escapeHTML(current.description)}
            </td>

            <td>
                <input
                    type="text"
                    class="input input-sm status-select"
                    value="${escapeHTML(current.status)}"
                    onchange="changeOrderStatus(${current.id}, this.value)"
                >
            </td>

            <td>
                <div class="row-actions">

                    <button
                        class="icon-btn"
                        onclick="deleteOrder(${current.id})"
                        aria-label="Remove"
                        title="Remove"
                    >
                        🗑
                    </button>

                </div>
            </td>
        `;

        tbody.appendChild(row);

        current = current.next;
    }
}


// change order status
function changeOrderStatus(id, status) {

    status = String(status).trim();

    if (status === "") {
        showToast(
            "Status cannot be empty.",
            "error"
        );

        renderOrders();

        return;
    }


    let current = orderItems.head;

    while (current !== null) {

        if (current.id === id) {

            current.status = status;

            saveData();
            renderOrders();
            renderStats();

            return;
        }

        current = current.next;
    }
}


// remove order
function deleteOrder(id) {

    if (!confirm("Remove this order?")) return;

    if (orderItems.head === null) {
        return;
    }


    // remove head node
    if (orderItems.head.id === id) {

        orderItems.head =
            orderItems.head.next;

        if (orderItems.head === null) {
            orderItems.tail = null;
        }

        orderItems.size--;

        saveData();
        renderOrders();
        renderStats();
        updateCustomerOptions();

        showToast(
            "Order removed.",
            "success"
        );

        return;
    }


    // search previous node
    let current = orderItems.head;

    while (current.next !== null) {

        if (current.next.id === id) {

            if (current.next === orderItems.tail) {
                orderItems.tail = current;
            }

            current.next =
                current.next.next;

            orderItems.size--;

            saveData();
            renderOrders();
            renderStats();
            updateCustomerOptions();

            showToast(
                "Order removed.",
                "success"
            );

            return;
        }

        current = current.next;
    }
}


// update customer suggestions
function updateCustomerOptions() {

    const datalist =
        document.getElementById("customerOptions");

    if (!datalist) return;

    datalist.innerHTML = "";


    let current = orderItems.head;

    while (current !== null) {

        let duplicate = false;

        let check = orderItems.head;

        while (check !== current) {

            if (check.customer === current.customer) {
                duplicate = true;
                break;
            }

            check = check.next;
        }


        if (!duplicate) {

            const option =
                document.createElement("option");

            option.value =
                current.customer;

            datalist.appendChild(option);
        }

        current = current.next;
    }
}


// render alerts
function renderAlerts() {

    const container =
        document.getElementById("alertsContainer");

    const flaggedEmpty =
        document.getElementById("alertsEmpty");

    container.innerHTML = "";


    let current = stockItems.head;
    let flaggedCount = 0;


    while (current !== null) {

        if (current.quantity <= current.threshold) {

            const sub =
                current.quantity <= 0
                    ? "Out of stock."
                    : `${current.quantity} ${current.unit} remaining. Reorder at ${current.threshold}.`;


            const row =
                document.createElement("div");

            row.className =
                "notif-item unread";


            row.innerHTML = `
                <div class="notif-icon type-stock">
                    !
                </div>

                <div class="notif-body">

                    <div class="notif-msg">
                        <strong>
                            ${escapeHTML(current.name)}
                        </strong>

                        needs attention
                    </div>

                    <div class="notif-time">
                        ${escapeHTML(sub)}
                    </div>

                </div>
            `;

            container.appendChild(row);

            flaggedCount++;
        }

        current = current.next;
    }


    if (flaggedEmpty) {

        flaggedEmpty.style.display =
            flaggedCount === 0
                ? "block"
                : "none";
    }


    const bellDot =
        document.getElementById("bellDot");

    if (bellDot) {

        bellDot.hidden =
            flaggedCount === 0;
    }
}


// update stat summary
function renderStats() {

    let total = 0;
    let low = 0;
    let out = 0;


    let currentStock =
        stockItems.head;

    while (currentStock !== null) {

        total++;

        if (currentStock.quantity <= 0) {
            out++;
        } else if (
            currentStock.quantity <=
            currentStock.threshold
        ) {
            low++;
        }

        currentStock =
            currentStock.next;
    }


    let activeOrders = 0;

    let currentOrder =
        orderItems.head;

    while (currentOrder !== null) {

        if (
            currentOrder.status.toLowerCase() !==
            "claimed"
        ) {
            activeOrders++;
        }

        currentOrder =
            currentOrder.next;
    }


    const totalEl =
        document.getElementById("statTotalItems");

    const lowEl =
        document.getElementById("statLowStock");

    const outEl =
        document.getElementById("statOutOfStock");

    const activeEl =
        document.getElementById("statActiveOrders");

    const navBadge =
        document.getElementById("navLowStockBadge");


    if (totalEl) totalEl.textContent = total;
    if (lowEl) lowEl.textContent = low;
    if (outEl) outEl.textContent = out;
    if (activeEl) activeEl.textContent = activeOrders;


    const flaggedCount =
        low + out;


    if (navBadge) {

        if (flaggedCount > 0) {

            navBadge.textContent =
                flaggedCount;

            navBadge.hidden = false;

        } else {

            navBadge.hidden = true;
        }
    }
}


// page load
document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadData();

        renderStock();
        renderOrders();
        renderAlerts();
        renderStats();
        updateCustomerOptions();


        document
            .getElementById("stockSearch")
            .addEventListener(
                "input",
                function () {
                    renderStock();
                }
            );


        document
            .getElementById("stockModal")
            .addEventListener(
                "click",
                function (event) {

                    if (
                        event.target === this
                    ) {
                        closeStockModal();
                    }
                }
            );


        document
            .getElementById("orderModal")
            .addEventListener(
                "click",
                function (event) {

                    if (
                        event.target === this
                    ) {
                        closeOrderModal();
                    }
                }
            );


        const navItems =
            document.querySelectorAll(
                ".nav-item"
            );


        navItems.forEach(
            function (item) {

                item.addEventListener(
                    "click",
                    function () {

                        navItems.forEach(
                            function (nav) {
                                nav.classList.remove(
                                    "active"
                                );
                            }
                        );

                        item.classList.add(
                            "active"
                        );
                    }
                );
            }
        );
    }
);


// export inventory log
function exportLogInventory() {

    const workbook =
        XLSX.utils.book_new();


    // inventory export data
    const inventoryData = [];

    inventoryData.push([
        "ID",
        "Item",
        "Quantity",
        "Unit",
        "Threshold"
    ]);


    let currentStock =
        stockItems.head;

    while (currentStock !== null) {

        inventoryData.push([
            currentStock.id,
            currentStock.name,
            currentStock.quantity,
            currentStock.unit,
            currentStock.threshold
        ]);

        currentStock =
            currentStock.next;
    }


    // order export data
    const orderData = [];

    orderData.push([
        "ID",
        "Customer",
        "Customer Type",
        "Description",
        "Status"
    ]);


    let currentOrder =
        orderItems.head;

    while (currentOrder !== null) {

        orderData.push([
            currentOrder.id,
            currentOrder.customer,
            currentOrder.customerType,
            currentOrder.description,
            currentOrder.status
        ]);

        currentOrder =
            currentOrder.next;
    }


    XLSX.utils.book_append_sheet(
        workbook,
        XLSX.utils.aoa_to_sheet(
            inventoryData
        ),
        "Inventory"
    );


    XLSX.utils.book_append_sheet(
        workbook,
        XLSX.utils.aoa_to_sheet(
            orderData
        ),
        "Orders"
    );


    XLSX.writeFile(
        workbook,
        "Inventory_Management.xlsx"
    );
}
