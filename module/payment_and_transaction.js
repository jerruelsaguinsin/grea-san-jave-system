<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Grea San Jave — Module 7: Payments</title>
    <style>
        /* =====================================================
           DESIGN TOKENS
        ===================================================== */
        :root {
            --paper: #F6F3EC;
            --paper-dim: #EDE9DE;
            --ink: #1B1B1E;
            --ink-soft: #3A3A3F;
            --ink-faint: #77767A;
            --line: #DAD5C7;
            --line-strong: #C7C1AF;
            --cyan: #0089C6;
            --cyan-ink: #04405A;
            --magenta: #D2006E;
            --magenta-ink: #5E0032;
            --yellow: #E8AC00;
            --yellow-ink: #4A3600;
            --key: #17181C;
            --ok: #1F8A5F;
            --ok-bg: #DFF1E7;
            --warn: #B4790C;
            --warn-bg: #FBEBCB;
            --danger: #C21E4B;
            --danger-bg: #FBE1E8;
            --info: #0089C6;
            --info-bg: #DEF0F9;
            --radius-sm: 4px;
            --radius-md: 7px;
            --shadow: 0 2px 10px rgba(27, 27, 30, 0.07);
        }

        /* =====================================================
           RESET
        ===================================================== */
        * { box-sizing: border-box; }
        html, body { min-height: 100%; }
        body {
            margin: 0;
            font-family: Arial, Helvetica, sans-serif;
            background: var(--paper);
            color: var(--ink);
            -webkit-font-smoothing: antialiased;
        }
        h1, h2, h3, h4 {
            margin: 0;
            color: var(--key);
            font-family: Arial, Helvetica, sans-serif;
        }
        p {
            color: var(--ink-soft);
            line-height: 1.55;
        }
        button, input, select, textarea { font-family: inherit; }

        /* =====================================================
           HEADER
        ===================================================== */
        header {
            position: relative;
            background: var(--key);
            color: white;
            padding: 25px 20px 22px;
            text-align: center;
            border-bottom: 4px solid var(--cyan);
            overflow: hidden;
        }
        header::before {
            content: "";
            position: absolute;
            top: 10px; left: 14px;
            width: 12px; height: 12px;
            border-top: 2px solid var(--cyan);
            border-left: 2px solid var(--cyan);
        }
        header::after {
            content: "";
            position: absolute;
            right: 14px; bottom: 10px;
            width: 12px; height: 12px;
            border-right: 2px solid var(--magenta);
            border-bottom: 2px solid var(--magenta);
        }
        header h1 {
            color: white;
            font-size: 28px;
            margin-bottom: 5px;
            letter-spacing: -0.02em;
        }
        header p {
            margin: 0;
            color: #BDBCC2;
            font-size: 13px;
        }

        /* =====================================================
           NAVIGATION
        ===================================================== */
        nav {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            background: white;
            border-bottom: 1px solid var(--line);
        }
        nav button {
            position: relative;
            padding: 14px 22px;
            border: none;
            border-bottom: 3px solid transparent;
            background: transparent;
            color: var(--ink-soft);
            cursor: pointer;
            font-size: 13px;
            font-weight: 600;
            transition: 0.15s ease;
        }
        nav button:hover {
            background: var(--paper-dim);
            color: var(--ink);
        }
        nav button.active {
            color: var(--key);
            border-bottom-color: var(--cyan);
            background: white;
        }

        /* =====================================================
           MAIN
        ===================================================== */
        main {
            width: 100%;
            max-width: 1400px;
            margin: auto;
            padding: 28px 26px 60px;
        }
        .module { display: none; }
        .module.active {
            display: block;
            animation: fadeIn 0.18s ease;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(3px); }
            to { opacity: 1; transform: translateY(0); }
        }

        /* =====================================================
           CARDS
        ===================================================== */
        .card {
            position: relative;
            background: white;
            border: 1px solid var(--line);
            border-radius: var(--radius-md);
            padding: 20px;
            margin-bottom: 20px;
            box-shadow: var(--shadow);
            overflow: hidden;
        }
        .card::before {
            content: "";
            position: absolute;
            top: 0; left: 0;
            width: 48px; height: 3px;
            background: var(--cyan);
        }
        .card h2 {
            font-size: 19px;
            margin-bottom: 7px;
            letter-spacing: -0.01em;
        }
        .card h3 {
            font-size: 14px;
            margin: 20px 0 10px;
        }

        /* =====================================================
           FORM
        ===================================================== */
        .form-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 17px;
        }
        label {
            display: block;
            margin-bottom: 6px;
            color: var(--ink-soft);
            font-size: 12px;
            font-weight: 600;
        }
        input, select, textarea {
            width: 100%;
            padding: 10px 11px;
            border: 1px solid var(--line-strong);
            border-radius: var(--radius-sm);
            background: white;
            color: var(--ink);
            font-size: 13px;
            outline: none;
            transition: 0.15s ease;
        }
        input:hover, select:hover, textarea:hover { border-color: #AEA796; }
        input:focus, select:focus, textarea:focus {
            border-color: var(--cyan);
            box-shadow: 0 0 0 3px rgba(0, 137, 198, 0.10);
        }
        input[readonly] {
            background: var(--paper-dim);
            color: var(--ink-soft);
        }

        /* =====================================================
           BUTTONS
        ===================================================== */
        button { transition: 0.15s ease; }
        button:active { transform: translateY(1px); }
        button.primary {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background: var(--key);
            color: white;
            border: 1px solid var(--key);
            padding: 10px 17px;
            border-radius: var(--radius-sm);
            cursor: pointer;
            font-size: 13px;
            font-weight: 600;
            margin-top: 15px;
        }
        button.primary:hover {
            background: #000;
            box-shadow: 0 3px 8px rgba(0,0,0,0.12);
        }
        button.danger {
            background: var(--danger);
            color: white;
            border: none;
            padding: 7px 11px;
            border-radius: var(--radius-sm);
            cursor: pointer;
            font-size: 12px;
            font-weight: 600;
        }
        button.danger:hover { background: #9E1739; }
        button.small {
            padding: 6px 9px;
            background: white;
            border: 1px solid var(--line-strong);
            color: var(--ink-soft);
            border-radius: var(--radius-sm);
            cursor: pointer;
            font-size: 11px;
            font-weight: 600;
        }
        button.small:hover {
            background: var(--paper-dim);
            border-color: var(--cyan);
            color: var(--cyan-ink);
        }

        /* =====================================================
           SUMMARY
        ===================================================== */
        .summary-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 14px;
        }
        .summary-box {
            position: relative;
            background: var(--key);
            color: white;
            border-radius: var(--radius-md);
            padding: 18px;
            overflow: hidden;
            border-top: 3px solid var(--cyan);
        }
        .summary-box:nth-child(2) { border-top-color: var(--magenta); }
        .summary-box:nth-child(3) { border-top-color: var(--yellow); }
        .summary-box h3 {
            margin: 0 0 7px;
            color: #BDBCC2;
            font-size: 11px;
            font-weight: 600;
        }
        .summary-box p {
            margin: 0;
            color: white;
            font-size: 25px;
            font-weight: 600;
        }

        /* =====================================================
           TABLES
        ===================================================== */
        #paymentsContainer { overflow-x: auto; }
        table {
            width: 100%;
            min-width: 850px;
            margin-top: 18px;
            border-collapse: collapse;
            background: white;
            font-size: 13px;
        }
        th {
            padding: 9px 10px;
            background: var(--paper-dim);
            color: var(--ink-faint);
            border-bottom: 1px solid var(--line-strong);
            text-align: left;
            font-size: 11px;
            font-weight: 600;
            white-space: nowrap;
        }
        td {
            padding: 11px 10px;
            color: var(--ink-soft);
            border-bottom: 1px solid var(--line);
            vertical-align: middle;
        }
        tbody tr { transition: background 0.12s ease; }
        tbody tr:hover { background: #FAF8F2; }
        tbody tr:last-child td { border-bottom: none; }
        td strong { color: var(--key); }

        /* =====================================================
           BADGES
        ===================================================== */
        .badge {
            display: inline-flex;
            align-items: center;
            gap: 5px;
            padding: 4px 9px;
            border-radius: 20px;
            font-size: 10.5px;
            font-weight: 600;
            white-space: nowrap;
        }
        .badge::before {
            content: "";
            width: 6px; height: 6px;
            border-radius: 50%;
        }
        .badge.green { background: var(--ok-bg); color: var(--ok); }
        .badge.green::before { background: var(--ok); }
        .badge.yellow { background: var(--warn-bg); color: var(--warn); }
        .badge.yellow::before { background: var(--warn); }
        .badge.red { background: var(--danger-bg); color: var(--danger); }
        .badge.red::before { background: var(--danger); }
        .badge.blue { background: var(--info-bg); color: var(--cyan-ink); }
        .badge.blue::before { background: var(--cyan); }

        /* =====================================================
           MESSAGE BOXES
        ===================================================== */
        .warning {
            background: var(--warn-bg);
            color: var(--yellow-ink);
            border-left: 3px solid var(--yellow);
            padding: 11px 14px;
            border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
            margin-top: 10px;
            font-size: 12.5px;
        }
        .success {
            background: var(--ok-bg);
            color: #155C40;
            border-left: 3px solid var(--ok);
            padding: 11px 14px;
            border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
            margin-top: 10px;
            font-size: 12.5px;
        }
        .info {
            background: var(--info-bg);
            color: var(--cyan-ink);
            border-left: 3px solid var(--cyan);
            padding: 11px 14px;
            border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
            margin-top: 10px;
            font-size: 12.5px;
        }

        /* =====================================================
           EMPTY
        ===================================================== */
        .empty {
            text-align: center;
            padding: 35px 20px;
            color: var(--ink-faint);
            font-size: 13px;
            border: 1px dashed var(--line-strong);
            margin-top: 15px;
            background: var(--paper);
        }

        /* =====================================================
           MUTED
        ===================================================== */
        .muted {
            color: var(--ink-faint);
            font-size: 12px;
            line-height: 1.5;
        }

        /* =====================================================
           FOOTER
        ===================================================== */
        footer {
            text-align: center;
            color: var(--ink-faint);
            font-size: 11px;
            padding: 25px;
            border-top: 1px solid var(--line);
            background: var(--paper-dim);
        }

        /* =====================================================
           SCROLLBAR
        ===================================================== */
        ::-webkit-scrollbar { width: 9px; height: 9px; }
        ::-webkit-scrollbar-track { background: var(--paper-dim); }
        ::-webkit-scrollbar-thumb { background: var(--line-strong); border-radius: 20px; }
        ::-webkit-scrollbar-thumb:hover { background: var(--ink-faint); }

        /* =====================================================
           MOBILE
        ===================================================== */
        @media (max-width: 900px) {
            main { padding: 20px 16px 40px; }
            .form-grid { grid-template-columns: 1fr; }
            .summary-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 650px) {
            header h1 { font-size: 22px; }
            nav button { flex: 1; padding: 12px 8px; font-size: 11px; }
            main { padding: 16px 10px 35px; }
            .card { padding: 15px; }
        }
    </style>
<base target="_blank">
</head>
<body>

<header>
    <h1>Grea San Jave Printing Services</h1>
    <p>Order, Payment & Inventory Management</p>
</header>

<nav>
    <button class="nav-btn" onclick="location.href='module3-order-intake.html'">Module 3 — Order Intake</button>
    <button class="nav-btn active" onclick="location.href='module7-payments.html'">Module 7 — Payments</button>
    <button class="nav-btn" onclick="location.href='module9-inventory.html'">Module 9 — Inventory</button>
</nav>

<main>
<section id="module7" class="module active">
    <div class="card">
        <h2>Payment & Transaction Records</h2>
        <p class="muted">Record customer payments and automatically calculate change and remaining balance.</p>
        <br>
        <div class="form-grid">
            <div>
                <label>Select Order</label>
                <select id="paymentOrder"></select>
            </div>
            <div>
                <label>Order Total</label>
                <input type="number" id="paymentTotal" readonly>
            </div>
            <div>
                <label>Amount Given</label>
                <input type="number" id="paymentAmount" min="0" step="0.01" placeholder="500">
                <small class="muted">Example: Order = ₱100, customer gives = ₱500.</small>
            </div>
            <div>
                <label>Payment Method</label>
                <select id="paymentMethod">
                    <option value="Cash">Cash</option>
                    <option value="GCash">GCash</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                </select>
            </div>
            <div>
                <label>Payment Type</label>
                <select id="paymentType">
                    <option value="Down Payment">Down Payment</option>
                    <option value="Partial Payment">Partial Payment</option>
                    <option value="Full Payment">Full Payment</option>
                </select>
            </div>
        </div>
        <button class="primary" onclick="recordPayment()">Record Payment</button>
        <div id="paymentMessage"></div>
    </div>

    <div class="card">
        <h2>Payment Summary</h2>
        <div class="summary-grid">
            <div class="summary-box">
                <h3>Total Sales Recorded</h3>
                <p id="totalSales">₱0.00</p>
            </div>
            <div class="summary-box">
                <h3>Total Paid</h3>
                <p id="totalPaid">₱0.00</p>
            </div>
            <div class="summary-box">
                <h3>Outstanding Balance</h3>
                <p id="totalBalance">₱0.00</p>
            </div>
        </div>
    </div>

    <div class="card">
        <h2>Transaction Records</h2>
        <div id="paymentsContainer"></div>
    </div>
</section>
</main>

<footer>
    Grea San Jave Printing Services — System Prototype
</footer>

<script>
/* =========================================================
   LOAD DATA
========================================================= */
let orders = JSON.parse(localStorage.getItem("gsj_orders")) || [];
let payments = JSON.parse(localStorage.getItem("gsj_payments")) || [];

/* =========================================================
   SAVE DATA
========================================================= */
function saveData() {
    localStorage.setItem("gsj_orders", JSON.stringify(orders));
    localStorage.setItem("gsj_payments", JSON.stringify(payments));
}

/* =========================================================
   HELPERS
========================================================= */
function generatePaymentID() {
    return "PAY-" + String(Date.now()).slice(-6);
}

function formatMoney(amount) {
    return "₱" + Number(amount).toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/* =========================================================
   PAYMENT ORDERS
========================================================= */
function updatePaymentOrders() {
    const select = document.getElementById("paymentOrder");
    if (orders.length === 0) {
        select.innerHTML = `<option value="">No orders available</option>`;
        document.getElementById("paymentTotal").value = "";
        return;
    }
    select.innerHTML = orders.map(order => `<option value="${order.id}">${order.id} - ${order.customerName}</option>`).join("");
    updatePaymentTotal();
}

/* =========================================================
   UPDATE PAYMENT TOTAL
========================================================= */
function updatePaymentTotal() {
    const orderID = document.getElementById("paymentOrder").value;
    const order = orders.find(order => order.id === orderID);
    if (!order) {
        document.getElementById("paymentTotal").value = "";
        return;
    }
    document.getElementById("paymentTotal").value = order.totalAmount.toFixed(2);
}

document.getElementById("paymentOrder").addEventListener("change", updatePaymentTotal);

/* =========================================================
   GET TOTAL PAID
========================================================= */
function getTotalPaidForOrder(orderID) {
    return payments
        .filter(payment => payment.orderID === orderID)
        .reduce((total, payment) => total + Number(payment.amountApplied), 0);
}

/* =========================================================
   RECORD PAYMENT
========================================================= */
function recordPayment() {
    const orderID = document.getElementById("paymentOrder").value;
    const amountGiven = Number(document.getElementById("paymentAmount").value);
    const method = document.getElementById("paymentMethod").value;
    const type = document.getElementById("paymentType").value;
    const order = orders.find(order => order.id === orderID);

    if (!order) { alert("Please select an order."); return; }
    if (amountGiven <= 0) { alert("Payment amount must be greater than 0."); return; }

    const alreadyPaid = getTotalPaidForOrder(orderID);
    const remainingBalance = Math.max(0, order.totalAmount - alreadyPaid);
    const amountApplied = Math.min(amountGiven, remainingBalance);
    const change = Math.max(0, amountGiven - remainingBalance);

    const payment = {
        id: generatePaymentID(),
        orderID,
        customerName: order.customerName,
        amountGiven,
        amountApplied,
        change,
        method,
        type,
        date: new Date().toLocaleString()
    };

    payments.push(payment);
    saveData();

    document.getElementById("paymentAmount").value = "";
    document.getElementById("paymentMessage").innerHTML = `
        <div class="success">
            <strong>Payment recorded successfully.</strong><br><br>
            Amount Given: <strong>${formatMoney(amountGiven)}</strong><br>
            Applied to Order: <strong>${formatMoney(amountApplied)}</strong><br>
            Change: <strong>${formatMoney(change)}</strong>
        </div>
    `;

    renderPayments();
    updatePaymentSummary();

    alert("Payment recorded!\n\nAmount Given: " + formatMoney(amountGiven) + "\nApplied: " + formatMoney(amountApplied) + "\nChange: " + formatMoney(change));
}

/* =========================================================
   PAYMENT TABLE
========================================================= */
function renderPayments() {
    const container = document.getElementById("paymentsContainer");
    if (payments.length === 0) {
        container.innerHTML = `<div class="empty">No transactions recorded yet.</div>`;
        return;
    }
    container.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>Payment ID</th>
                    <th>Order</th>
                    <th>Customer</th>
                    <th>Amount Given</th>
                    <th>Applied</th>
                    <th>Change</th>
                    <th>Method</th>
                    <th>Type</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                ${payments.map(payment => `
                    <tr>
                        <td>${payment.id}</td>
                        <td>${payment.orderID}</td>
                        <td>${payment.customerName}</td>
                        <td><strong>${formatMoney(payment.amountGiven)}</strong></td>
                        <td>${formatMoney(payment.amountApplied)}</td>
                        <td>${payment.change > 0 ? `<span class="badge yellow">${formatMoney(payment.change)}</span>` : formatMoney(0)}</td>
                        <td>${payment.method}</td>
                        <td><span class="badge blue">${payment.type}</span></td>
                        <td>${payment.date}</td>
                    </tr>
                `).join("")}
            </tbody>
        </table>
    `;
}

/* =========================================================
   PAYMENT SUMMARY
========================================================= */
function updatePaymentSummary() {
    const totalSales = orders.reduce((sum, order) => sum + Number(order.totalAmount), 0);
    const totalPaid = payments.reduce((sum, payment) => sum + Number(payment.amountApplied), 0);
    const totalBalance = Math.max(0, totalSales - totalPaid);

    document.getElementById("totalSales").textContent = formatMoney(totalSales);
    document.getElementById("totalPaid").textContent = formatMoney(totalPaid);
    document.getElementById("totalBalance").textContent = formatMoney(totalBalance);
}

/* =========================================================
   START
========================================================= */
updatePaymentOrders();
renderPayments();
updatePaymentSummary();
</script>

</body>
</html>
