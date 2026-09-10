<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Grea San Jave — Module 9: Inventory</title>
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
           TABLES
        ===================================================== */
        #inventoryContainer { overflow-x: auto; }
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
    <button class="nav-btn" onclick="location.href='module7-payments.html'">Module 7 — Payments</button>
    <button class="nav-btn active" onclick="location.href='module9-inventory.html'">Module 9 — Inventory</button>
</nav>

<main>
<section id="module9" class="module active">
    <div class="card">
        <h2>Inventory Management</h2>
        <p class="muted">Track shop stock and home stock separately and identify supplies that need restocking.</p>
        <br>
        <div class="form-grid">
            <div>
                <label>Item Name</label>
                <input type="text" id="inventoryName" placeholder="Bond Paper">
            </div>
            <div>
                <label>Category</label>
                <select id="inventoryCategory">
                    <option value="Bond Paper">Bond Paper</option>
                    <option value="Photo Paper">Photo Paper</option>
                    <option value="Specialty Paper">Specialty Paper</option>
                    <option value="Ink/Toner">Ink/Toner</option>
                    <option value="Binding Materials">Binding Materials</option>
                    <option value="Lamination Materials">Lamination Materials</option>
                </select>
            </div>
            <div>
                <label>Unit</label>
                <input type="text" id="inventoryUnit" placeholder="box / pack / bottle">
            </div>
            <div>
                <label>Shop Stock</label>
                <input type="number" id="shopStock" min="0" value="0">
            </div>
            <div>
                <label>Home Stock</label>
                <input type="number" id="homeStock" min="0" value="0">
            </div>
            <div>
                <label>Reorder Level</label>
                <input type="number" id="reorderLevel" min="0" value="1">
            </div>
        </div>
        <p class="muted">The reorder level is currently 1 as a temporary default.</p>
        <button class="primary" onclick="addInventoryItem()">Add Inventory Item</button>
        <div id="inventoryMessage"></div>
    </div>

    <div class="card">
        <h2>Inventory Overview</h2>
        <div id="inventoryContainer"></div>
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
let inventory = JSON.parse(localStorage.getItem("gsj_inventory")) || [];

/* =========================================================
   SAVE DATA
========================================================= */
function saveData() {
    localStorage.setItem("gsj_inventory", JSON.stringify(inventory));
}

/* =========================================================
   HELPERS
========================================================= */
function generateInventoryID() {
    return "INV-" + String(Date.now()).slice(-6);
}

/* =========================================================
   INVENTORY
========================================================= */
function addInventoryItem() {
    const name = document.getElementById("inventoryName").value.trim();
    const category = document.getElementById("inventoryCategory").value;
    const unit = document.getElementById("inventoryUnit").value.trim();
    const shopStock = Number(document.getElementById("shopStock").value);
    const homeStock = Number(document.getElementById("homeStock").value);
    const reorderLevel = Number(document.getElementById("reorderLevel").value);

    if (!name) { alert("Please enter an item name."); return; }
    if (!unit) { alert("Please enter the inventory unit."); return; }
    if (shopStock < 0 || homeStock < 0) { alert("Stock cannot be negative."); return; }

    const item = {
        id: generateInventoryID(),
        name,
        category,
        unit,
        shopStock,
        homeStock,
        reorderLevel
    };

    inventory.push(item);
    saveData();

    document.getElementById("inventoryName").value = "";
    document.getElementById("inventoryUnit").value = "";
    document.getElementById("shopStock").value = 0;
    document.getElementById("homeStock").value = 0;
    document.getElementById("inventoryMessage").innerHTML = `<div class="success">Inventory item added successfully.</div>`;
    renderInventory();
}

/* =========================================================
   INVENTORY TABLE
========================================================= */
function renderInventory() {
    const container = document.getElementById("inventoryContainer");
    if (inventory.length === 0) {
        container.innerHTML = `<div class="empty">No inventory items yet.</div>`;
        return;
    }
    container.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Category</th>
                    <th>Shop</th>
                    <th>Home</th>
                    <th>Total</th>
                    <th>Reorder Level</th>
                    <th>Status</th>
                    <th>Adjust</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                ${inventory.map(item => {
                    const total = Number(item.shopStock) + Number(item.homeStock);
                    const lowStock = item.shopStock <= item.reorderLevel && item.homeStock <= item.reorderLevel;
                    return `
                        <tr>
                            <td><strong>${item.name}</strong></td>
                            <td>${item.category}</td>
                            <td>${item.shopStock} ${item.unit}</td>
                            <td>${item.homeStock} ${item.unit}</td>
                            <td><strong>${total} ${item.unit}</strong></td>
                            <td>${item.reorderLevel}</td>
                            <td>
                                ${lowStock
                                    ? `<span class="badge red">LOW STOCK</span>`
                                    : `<span class="badge green">OK</span>`
                                }
                            </td>
                            <td>
                                <button class="small" onclick="adjustStock('${item.id}', 'shop', 1)">+ Shop</button>
                                <button class="small" onclick="adjustStock('${item.id}', 'shop', -1)">- Shop</button>
                                <br>
                                <button class="small" onclick="adjustStock('${item.id}', 'home', 1)">+ Home</button>
                                <button class="small" onclick="adjustStock('${item.id}', 'home', -1)">- Home</button>
                            </td>
                            <td><button class="danger" onclick="deleteInventory('${item.id}')">Delete</button></td>
                        </tr>
                    `;
                }).join("")}
            </tbody>
        </table>
    `;
}

/* =========================================================
   ADJUST STOCK
========================================================= */
function adjustStock(itemID, location, amount) {
    const item = inventory.find(item => item.id === itemID);
    if (!item) return;
    if (location === "shop") {
        item.shopStock = Math.max(0, item.shopStock + amount);
    }
    if (location === "home") {
        item.homeStock = Math.max(0, item.homeStock + amount);
    }
    saveData();
    renderInventory();
}

/* =========================================================
   DELETE INVENTORY
========================================================= */
function deleteInventory(itemID) {
    if (!confirm("Delete this inventory item?")) return;
    inventory = inventory.filter(item => item.id !== itemID);
    saveData();
    renderInventory();
}

/* =========================================================
   STARTER INVENTORY
========================================================= */
function addStarterInventory() {
    if (inventory.length > 0) return;
    inventory = [
        { id: "INV-001", name: "Bond Paper", category: "Bond Paper", unit: "box", shopStock: 2, homeStock: 2, reorderLevel: 1 },
        { id: "INV-002", name: "Photo Paper", category: "Photo Paper", unit: "pack", shopStock: 3, homeStock: 1, reorderLevel: 1 },
        { id: "INV-003", name: "Black Ink", category: "Ink/Toner", unit: "bottle", shopStock: 2, homeStock: 1, reorderLevel: 1 }
    ];
    saveData();
}

/* =========================================================
   START
========================================================= */
addStarterInventory();
renderInventory();
</script>

</body>
</html>
