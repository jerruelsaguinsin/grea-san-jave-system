<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>
        Grea San Jave Printing Services
    </title>


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

            --shadow:
                0 2px 10px
                rgba(27, 27, 30, 0.07);

        }


        /* =====================================================
           RESET
        ===================================================== */

        * {
            box-sizing: border-box;
        }


        html,
        body {
            min-height: 100%;
        }


        body {

            margin: 0;

            font-family:
                Arial,
                Helvetica,
                sans-serif;

            background: var(--paper);

            color: var(--ink);

            -webkit-font-smoothing: antialiased;

        }


        h1,
        h2,
        h3,
        h4 {

            margin: 0;

            color: var(--key);

            font-family:
                Arial,
                Helvetica,
                sans-serif;

        }


        p {

            color: var(--ink-soft);

            line-height: 1.55;

        }


        button,
        input,
        select,
        textarea {

            font-family: inherit;

        }


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

            top: 10px;
            left: 14px;

            width: 12px;
            height: 12px;

            border-top:
                2px solid var(--cyan);

            border-left:
                2px solid var(--cyan);

        }


        header::after {

            content: "";

            position: absolute;

            right: 14px;
            bottom: 10px;

            width: 12px;
            height: 12px;

            border-right:
                2px solid var(--magenta);

            border-bottom:
                2px solid var(--magenta);

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

            border-bottom:
                1px solid var(--line);

        }


        nav button {

            position: relative;

            padding: 14px 22px;

            border: none;

            border-bottom:
                3px solid transparent;

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

            border-bottom-color:
                var(--cyan);

            background: white;

        }


        /* =====================================================
           MAIN
        ===================================================== */

        main {

            width: 100%;

            max-width: 1400px;

            margin: auto;

            padding:
                28px 26px 60px;

        }


        .module {

            display: none;

        }


        .module.active {

            display: block;

            animation:
                fadeIn 0.18s ease;

        }


        @keyframes fadeIn {

            from {

                opacity: 0;

                transform:
                    translateY(3px);

            }

            to {

                opacity: 1;

                transform:
                    translateY(0);

            }

        }


        /* =====================================================
           CARDS
        ===================================================== */

        .card {

            position: relative;

            background: white;

            border:
                1px solid var(--line);

            border-radius:
                var(--radius-md);

            padding: 20px;

            margin-bottom: 20px;

            box-shadow:
                var(--shadow);

            overflow: hidden;

        }


        .card::before {

            content: "";

            position: absolute;

            top: 0;
            left: 0;

            width: 48px;
            height: 3px;

            background: var(--cyan);

        }


        .card h2 {

            font-size: 19px;

            margin-bottom: 7px;

            letter-spacing:
                -0.01em;

        }


        .card h3 {

            font-size: 14px;

            margin:
                20px 0 10px;

        }


        /* =====================================================
           FORM
        ===================================================== */

        .form-grid {

            display: grid;

            grid-template-columns:
                repeat(
                    auto-fit,
                    minmax(220px, 1fr)
                );

            gap: 17px;

        }


        label {

            display: block;

            margin-bottom: 6px;

            color: var(--ink-soft);

            font-size: 12px;

            font-weight: 600;

        }


        input,
        select,
        textarea {

            width: 100%;

            padding:
                10px 11px;

            border:
                1px solid var(--line-strong);

            border-radius:
                var(--radius-sm);

            background: white;

            color: var(--ink);

            font-size: 13px;

            outline: none;

            transition: 0.15s ease;

        }


        input:hover,
        select:hover,
        textarea:hover {

            border-color:
                #AEA796;

        }


        input:focus,
        select:focus,
        textarea:focus {

            border-color:
                var(--cyan);

            box-shadow:
                0 0 0 3px
                rgba(
                    0,
                    137,
                    198,
                    0.10
                );

        }


        input[readonly] {

            background:
                var(--paper-dim);

            color:
                var(--ink-soft);

        }


        input[type="file"] {

            padding: 9px;

            background:
                var(--paper);

            cursor: pointer;

        }


        input[type="file"]::file-selector-button {

            border:
                1px solid var(--line-strong);

            background: white;

            color: var(--ink);

            padding:
                7px 11px;

            margin-right: 10px;

            border-radius:
                var(--radius-sm);

            cursor: pointer;

            font-size: 12px;

            font-weight: 600;

        }


        /* =====================================================
           BUTTONS
        ===================================================== */

        button {

            transition: 0.15s ease;

        }


        button:active {

            transform:
                translateY(1px);

        }


        button.primary {

            display: inline-flex;

            align-items: center;

            justify-content: center;

            background:
                var(--key);

            color: white;

            border:
                1px solid var(--key);

            padding:
                10px 17px;

            border-radius:
                var(--radius-sm);

            cursor: pointer;

            font-size: 13px;

            font-weight: 600;

            margin-top: 15px;

        }


        button.primary:hover {

            background: #000;

            box-shadow:
                0 3px 8px
                rgba(0,0,0,0.12);

        }


        button.danger {

            background:
                var(--danger);

            color: white;

            border: none;

            padding:
                7px 11px;

            border-radius:
                var(--radius-sm);

            cursor: pointer;

            font-size: 12px;

            font-weight: 600;

        }


        button.danger:hover {

            background:
                #9E1739;

        }


        button.small {

            padding:
                6px 9px;

            background: white;

            border:
                1px solid var(--line-strong);

            color:
                var(--ink-soft);

            border-radius:
                var(--radius-sm);

            cursor: pointer;

            font-size: 11px;

            font-weight: 600;

        }


        button.small:hover {

            background:
                var(--paper-dim);

            border-color:
                var(--cyan);

            color:
                var(--cyan-ink);

        }


        /* =====================================================
           SUMMARY
        ===================================================== */

        .summary-grid {

            display: grid;

            grid-template-columns:
                repeat(
                    auto-fit,
                    minmax(200px, 1fr)
                );

            gap: 14px;

        }


        .summary-box {

            position: relative;

            background:
                var(--key);

            color: white;

            border-radius:
                var(--radius-md);

            padding: 18px;

            overflow: hidden;

            border-top:
                3px solid var(--cyan);

        }


        .summary-box:nth-child(2) {

            border-top-color:
                var(--magenta);

        }


        .summary-box:nth-child(3) {

            border-top-color:
                var(--yellow);

        }


        .summary-box h3 {

            margin:
                0 0 7px;

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

        #ordersContainer,
        #paymentsContainer,
        #inventoryContainer {

            overflow-x: auto;

        }


        table {

            width: 100%;

            min-width: 850px;

            margin-top: 18px;

            border-collapse: collapse;

            background: white;

            font-size: 13px;

        }


        th {

            padding:
                9px 10px;

            background:
                var(--paper-dim);

            color:
                var(--ink-faint);

            border-bottom:
                1px solid var(--line-strong);

            text-align: left;

            font-size: 11px;

            font-weight: 600;

            white-space: nowrap;

        }


        td {

            padding:
                11px 10px;

            color:
                var(--ink-soft);

            border-bottom:
                1px solid var(--line);

            vertical-align: middle;

        }


        tbody tr {

            transition:
                background 0.12s ease;

        }


        tbody tr:hover {

            background:
                #FAF8F2;

        }


        tbody tr:last-child td {

            border-bottom: none;

        }


        td strong {

            color: var(--key);

        }


        /* =====================================================
           BADGES
        ===================================================== */

        .badge {

            display: inline-flex;

            align-items: center;

            gap: 5px;

            padding:
                4px 9px;

            border-radius: 20px;

            font-size: 10.5px;

            font-weight: 600;

            white-space: nowrap;

        }


        .badge::before {

            content: "";

            width: 6px;
            height: 6px;

            border-radius: 50%;

        }


        .badge.green {

            background:
                var(--ok-bg);

            color:
                var(--ok);

        }


        .badge.green::before {

            background:
                var(--ok);

        }


        .badge.yellow {

            background:
                var(--warn-bg);

            color:
                var(--warn);

        }


        .badge.yellow::before {

            background:
                var(--warn);

        }


        .badge.red {

            background:
                var(--danger-bg);

            color:
                var(--danger);

        }


        .badge.red::before {

            background:
                var(--danger);

        }


        .badge.blue {

            background:
                var(--info-bg);

            color:
                var(--cyan-ink);

        }


        .badge.blue::before {

            background:
                var(--cyan);

        }


        /* =====================================================
           MESSAGE BOXES
        ===================================================== */

        .warning {

            background:
                var(--warn-bg);

            color:
                var(--yellow-ink);

            border-left:
                3px solid var(--yellow);

            padding:
                11px 14px;

            border-radius:
                0
                var(--radius-sm)
                var(--radius-sm)
                0;

            margin-top: 10px;

            font-size: 12.5px;

        }


        .success {

            background:
                var(--ok-bg);

            color:
                #155C40;

            border-left:
                3px solid var(--ok);

            padding:
                11px 14px;

            border-radius:
                0
                var(--radius-sm)
                var(--radius-sm)
                0;

            margin-top: 10px;

            font-size: 12.5px;

        }


        .info {

            background:
                var(--info-bg);

            color:
                var(--cyan-ink);

            border-left:
                3px solid var(--cyan);

            padding:
                11px 14px;

            border-radius:
                0
                var(--radius-sm)
                var(--radius-sm)
                0;

            margin-top: 10px;

            font-size: 12.5px;

        }


        /* =====================================================
           FILE LIST
        ===================================================== */

        .file-list {

            margin-top: 8px;

            padding-left: 18px;

            color:
                var(--ink-soft);

        }


        .file-list li {

            margin:
                4px 0;

            font-size: 12px;

        }


        /* =====================================================
           PRICE PREVIEW
        ===================================================== */

        #pricePreview {

            margin-top: 16px;

            font-size: 13px;

            font-family:
                Consolas,
                "Courier New",
                monospace;

        }


        #pricePreview strong {

            color:
                var(--cyan-ink);

            font-size: 17px;

        }


        /* =====================================================
           EMPTY
        ===================================================== */

        .empty {

            text-align: center;

            padding:
                35px 20px;

            color:
                var(--ink-faint);

            font-size: 13px;

            border:
                1px dashed
                var(--line-strong);

            margin-top: 15px;

            background:
                var(--paper);

        }


        /* =====================================================
           MUTED
        ===================================================== */

        .muted {

            color:
                var(--ink-faint);

            font-size: 12px;

            line-height:
                1.5;

        }


        /* =====================================================
           FOOTER
        ===================================================== */

        footer {

            text-align: center;

            color:
                var(--ink-faint);

            font-size: 11px;

            padding: 25px;

            border-top:
                1px solid var(--line);

            background:
                var(--paper-dim);

        }


        /* =====================================================
           SCROLLBAR
        ===================================================== */

        ::-webkit-scrollbar {

            width: 9px;
            height: 9px;

        }


        ::-webkit-scrollbar-track {

            background:
                var(--paper-dim);

        }


        ::-webkit-scrollbar-thumb {

            background:
                var(--line-strong);

            border-radius: 20px;

        }


        ::-webkit-scrollbar-thumb:hover {

            background:
                var(--ink-faint);

        }


        /* =====================================================
           MOBILE
        ===================================================== */

        @media (max-width: 900px) {

            main {

                padding:
                    20px 16px 40px;

            }

            .form-grid {

                grid-template-columns: 1fr;

            }

            .summary-grid {

                grid-template-columns: 1fr;

            }

        }


        @media (max-width: 650px) {

            header h1 {

                font-size: 22px;

            }


            nav button {

                flex: 1;

                padding:
                    12px 8px;

                font-size: 11px;

            }


            main {

                padding:
                    16px 10px 35px;

            }


            .card {

                padding: 15px;

            }

        }

    </style>

</head>


<body>


<!-- =====================================================
     HEADER
===================================================== -->

<header>

    <h1>
        Grea San Jave Printing Services
    </h1>

    <p>
        Order, Payment & Inventory Management
    </p>

</header>



<!-- =====================================================
     NAVIGATION
===================================================== -->

<nav>

    <button
        class="nav-btn active"
        onclick="showModule('module3', this)"
    >

        Module 3
        -
        Order Intake

    </button>


    <button
        class="nav-btn"
        onclick="showModule('module7', this)"
    >

        Module 7
        -
        Payments

    </button>


    <button
        class="nav-btn"
        onclick="showModule('module9', this)"
    >

        Module 9
        -
        Inventory

    </button>

</nav>



<main>


<!-- =====================================================
     MODULE 3
===================================================== -->

<section
    id="module3"
    class="module active"
>


    <div class="card">

        <h2>
            Order Intake & File Submission
        </h2>

        <p class="muted">

            Record files received through Messenger,
            Gmail, Bluetooth, or in-person transactions.

        </p>


        <br>


        <div class="form-grid">


            <div>

                <label>
                    Customer Name
                </label>

                <input
                    type="text"
                    id="customerName"
                    placeholder="Juan Dela Cruz"
                >

            </div>


            <div>

                <label>
                    Contact Number
                </label>

                <input
                    type="text"
                    id="customerContact"
                    placeholder="09XXXXXXXXX"
                >

            </div>


            <div>

                <label>
                    Submission Channel
                </label>

                <select
                    id="submissionChannel"
                >

                    <option value="Messenger">
                        Messenger
                    </option>

                    <option value="Email">
                        Email / Gmail
                    </option>

                    <option value="In Person">
                        In Person
                    </option>

                    <option value="Bluetooth">
                        Bluetooth
                    </option>

                </select>

            </div>


            <div>

                <label>
                    Paper Size
                </label>

                <select id="paperSize">

                    <option value="A4">
                        A4
                    </option>

                    <option value="Short">
                        Short / Letter
                    </option>

                    <option value="Long">
                        Long / Legal
                    </option>

                    <option value="A3">
                        A3
                    </option>

                    <option value="Other">
                        Other
                    </option>

                </select>

            </div>


            <div>

                <label>
                    Copies
                </label>

                <input
                    type="number"
                    id="copies"
                    value="1"
                    min="1"
                    oninput="updatePricePreview()"
                >

            </div>


            <div>

                <label>
                    Pages
                </label>

                <input
                    type="number"
                    id="pages"
                    value="1"
                    min="1"
                    oninput="updatePricePreview()"
                >

                <small class="muted">

                    Image files automatically count
                    as individual pages.

                </small>

            </div>


            <div>

                <label>
                    Print Type
                </label>

                <select
                    id="printType"
                    onchange="updatePricePreview()"
                >

                    <option value="Black Text">

                        Black Text
                        -
                        ₱3/page

                    </option>

                    <option value="Minimal Color">

                        Minimal Color
                        -
                        ₱5/page

                    </option>

                    <option value="Small Image">

                        Small Image
                        -
                        ₱10/page

                    </option>

                    <option value="Full Color">

                        Full Color
                        -
                        ₱20/page

                    </option>

                </select>

            </div>


            <div>

                <label>
                    Large File Threshold (MB)
                </label>

                <input
                    type="number"
                    id="largeFileThreshold"
                    value="50"
                    min="1"
                >

                <small class="muted">

                    Temporary default until client
                    confirms the actual threshold.

                </small>

            </div>


        </div>


        <h3>
            Upload Files
        </h3>


        <input
            type="file"
            id="orderFiles"
            multiple
            accept="
                .pdf,
                .doc,
                .docx,
                .jpg,
                .jpeg,
                .png
            "
            onchange="handleFileSelection()"
        >


        <div
            id="fileFeedback"
        ></div>


        <div
            id="pricePreview"
            class="info"
        >

            Estimated Price:

            <strong>
                ₱3.00
            </strong>

        </div>


        <button
            class="primary"
            onclick="createOrder()"
        >

            Create Order

        </button>

    </div>



    <div class="card">

        <h2>
            Current Orders
        </h2>


        <input
            type="text"
            id="orderSearch"
            placeholder="
                Search by order ID,
                customer, or file name...
            "
            oninput="renderOrders()"
        >


        <div
            id="ordersContainer"
        ></div>

    </div>

</section>



<!-- =====================================================
     MODULE 7
===================================================== -->

<section
    id="module7"
    class="module"
>


    <div class="card">

        <h2>
            Payment & Transaction Records
        </h2>

        <p class="muted">

            Record customer payments and automatically
            calculate change and remaining balance.

        </p>


        <br>


        <div class="form-grid">


            <div>

                <label>
                    Select Order
                </label>

                <select
                    id="paymentOrder"
                ></select>

            </div>


            <div>

                <label>
                    Order Total
                </label>

                <input
                    type="number"
                    id="paymentTotal"
                    readonly
                >

            </div>


            <div>

                <label>
                    Amount Given
                </label>

                <input
                    type="number"
                    id="paymentAmount"
                    min="0"
                    step="0.01"
                    placeholder="500"
                >

                <small class="muted">

                    Example:
                    Order = ₱100,
                    customer gives = ₱500.

                </small>

            </div>


            <div>

                <label>
                    Payment Method
                </label>

                <select
                    id="paymentMethod"
                >

                    <option value="Cash">
                        Cash
                    </option>

                    <option value="GCash">
                        GCash
                    </option>

                    <option value="Bank Transfer">
                        Bank Transfer
                    </option>

                </select>

            </div>


            <div>

                <label>
                    Payment Type
                </label>

                <select
                    id="paymentType"
                >

                    <option value="Down Payment">
                        Down Payment
                    </option>

                    <option value="Partial Payment">
                        Partial Payment
                    </option>

                    <option value="Full Payment">
                        Full Payment
                    </option>

                </select>

            </div>


        </div>


        <button
            class="primary"
            onclick="recordPayment()"
        >

            Record Payment

        </button>


        <div
            id="paymentMessage"
        ></div>

    </div>



    <div class="card">

        <h2>
            Payment Summary
        </h2>


        <div class="summary-grid">


            <div class="summary-box">

                <h3>
                    Total Sales Recorded
                </h3>

                <p
                    id="totalSales"
                >
                    ₱0.00
                </p>

            </div>


            <div class="summary-box">

                <h3>
                    Total Paid
                </h3>

                <p
                    id="totalPaid"
                >
                    ₱0.00
                </p>

            </div>


            <div class="summary-box">

                <h3>
                    Outstanding Balance
                </h3>

                <p
                    id="totalBalance"
                >
                    ₱0.00
                </p>

            </div>


        </div>

    </div>



    <div class="card">

        <h2>
            Transaction Records
        </h2>

        <div
            id="paymentsContainer"
        ></div>

    </div>

</section>



<!-- =====================================================
     MODULE 9
===================================================== -->

<section
    id="module9"
    class="module"
>


    <div class="card">

        <h2>
            Inventory Management
        </h2>

        <p class="muted">

            Track shop stock and home stock separately
            and identify supplies that need restocking.

        </p>


        <br>


        <div class="form-grid">


            <div>

                <label>
                    Item Name
                </label>

                <input
                    type="text"
                    id="inventoryName"
                    placeholder="Bond Paper"
                >

            </div>


            <div>

                <label>
                    Category
                </label>

                <select
                    id="inventoryCategory"
                >

                    <option value="Bond Paper">
                        Bond Paper
                    </option>

                    <option value="Photo Paper">
                        Photo Paper
                    </option>

                    <option value="Specialty Paper">
                        Specialty Paper
                    </option>

                    <option value="Ink/Toner">
                        Ink/Toner
                    </option>

                    <option value="Binding Materials">
                        Binding Materials
                    </option>

                    <option value="Lamination Materials">
                        Lamination Materials
                    </option>

                </select>

            </div>


            <div>

                <label>
                    Unit
                </label>

                <input
                    type="text"
                    id="inventoryUnit"
                    placeholder="
                        box / pack / bottle
                    "
                >

            </div>


            <div>

                <label>
                    Shop Stock
                </label>

                <input
                    type="number"
                    id="shopStock"
                    min="0"
                    value="0"
                >

            </div>


            <div>

                <label>
                    Home Stock
                </label>

                <input
                    type="number"
                    id="homeStock"
                    min="0"
                    value="0"
                >

            </div>


            <div>

                <label>
                    Reorder Level
                </label>

                <input
                    type="number"
                    id="reorderLevel"
                    min="0"
                    value="1"
                >

            </div>


        </div>


        <p class="muted">

            The reorder level is currently 1 as a
            temporary default.

        </p>


        <button
            class="primary"
            onclick="addInventoryItem()"
        >

            Add Inventory Item

        </button>


        <div
            id="inventoryMessage"
        ></div>

    </div>



    <div class="card">

        <h2>
            Inventory Overview
        </h2>

        <div
            id="inventoryContainer"
        ></div>

    </div>

</section>


</main>



<footer>

    Grea San Jave Printing Services
    — System Prototype

</footer>



<script>


/* =========================================================
   PRICE SETTINGS
========================================================= */

const PRICE_PER_PAGE = {

    "Black Text": 3,

    "Minimal Color": 5,

    "Small Image": 10,

    "Full Color": 20

};



/* =========================================================
   LOAD DATA
========================================================= */

let orders =
    JSON.parse(
        localStorage.getItem(
            "gsj_orders"
        )
    ) || [];


let payments =
    JSON.parse(
        localStorage.getItem(
            "gsj_payments"
        )
    ) || [];


let inventory =
    JSON.parse(
        localStorage.getItem(
            "gsj_inventory"
        )
    ) || [];



/* =========================================================
   SAVE DATA
========================================================= */

function saveData() {

    localStorage.setItem(
        "gsj_orders",
        JSON.stringify(orders)
    );


    localStorage.setItem(
        "gsj_payments",
        JSON.stringify(payments)
    );


    localStorage.setItem(
        "gsj_inventory",
        JSON.stringify(inventory)
    );

}



/* =========================================================
   HELPERS
========================================================= */

function generateOrderID() {

    return (
        "ORD-" +
        String(Date.now())
            .slice(-6)
    );

}


function generatePaymentID() {

    return (
        "PAY-" +
        String(Date.now())
            .slice(-6)
    );

}


function generateInventoryID() {

    return (
        "INV-" +
        String(Date.now())
            .slice(-6)
    );

}


function formatMoney(amount) {

    return (
        "₱" +
        Number(amount)
            .toLocaleString(
                "en-PH",
                {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                }
            )
    );

}



/* =========================================================
   MODULE NAVIGATION
========================================================= */

function showModule(
    moduleID,
    button
) {

    document
        .querySelectorAll(".module")
        .forEach(module => {

            module.classList.remove(
                "active"
            );

        });


    document
        .querySelectorAll(".nav-btn")
        .forEach(btn => {

            btn.classList.remove(
                "active"
            );

        });


    document
        .getElementById(moduleID)
        .classList.add("active");


    if (button) {

        button.classList.add(
            "active"
        );

    }


    refreshEverything();

}



/* =========================================================
   FILE SELECTION
========================================================= */

function handleFileSelection() {

    const fileInput =
        document.getElementById(
            "orderFiles"
        );


    const files =
        Array.from(
            fileInput.files
        );


    /*
        IMAGE FILE RULE

        Every uploaded JPG/PNG image
        represents one printable page.

        Example:

        6 images
        ×
        1 copy
        ×
        ₱3
        =
        ₱18
    */

    const imageFiles =
        files.filter(file => {

            return [

                "image/jpeg",
                "image/jpg",
                "image/png"

            ].includes(
                file.type
            );

        });


    if (
        imageFiles.length > 0 &&
        imageFiles.length === files.length
    ) {

        document.getElementById(
            "pages"
        ).value =
            imageFiles.length;

    }


    updateFileFeedback(
        files
    );


    updatePricePreview();

}



/* =========================================================
   FILE FEEDBACK
========================================================= */

function updateFileFeedback(
    files
) {

    const feedback =
        document.getElementById(
            "fileFeedback"
        );


    if (
        files.length === 0
    ) {

        feedback.innerHTML =
            "";

        return;

    }


    const threshold =
        Number(
            document.getElementById(
                "largeFileThreshold"
            ).value
        );


    const largeFiles =
        files.filter(file => {

            const sizeMB =
                file.size /
                (
                    1024 *
                    1024
                );

            return (
                sizeMB >= threshold
            );

        });


    let html = `

        <div class="success">

            ${files.length}
            file(s) selected.

        </div>

    `;


    if (
        largeFiles.length > 0
    ) {

        html += `

            <div class="warning">

                <strong>
                    Large file detected.
                </strong>

                <br>

                Customer approval is required.

                <ul class="file-list">

                    ${largeFiles.map(
                        file => `

                            <li>

                                ${file.name}
                                -
                                ${(
                                    file.size /
                                    (
                                        1024 *
                                        1024
                                    )
                                ).toFixed(2)}
                                MB

                            </li>

                        `
                    ).join("")}

                </ul>

            </div>

        `;

    }


    feedback.innerHTML =
        html;

}



/* =========================================================
   PRICE PREVIEW
========================================================= */

function updatePricePreview() {

    const pages =
        Number(
            document.getElementById(
                "pages"
            ).value
        ) || 0;


    const copies =
        Number(
            document.getElementById(
                "copies"
            ).value
        ) || 0;


    const printType =
        document.getElementById(
            "printType"
        ).value;


    const price =
        PRICE_PER_PAGE[
            printType
        ];


    const total =
        pages *
        copies *
        price;


    document.getElementById(
        "pricePreview"
    ).innerHTML = `

        Estimated Price:

        <strong>

            ${formatMoney(
                total
            )}

        </strong>

        <br>

        <small>

            ${pages}
            page(s)
            ×
            ${copies}
            copy/copies
            ×
            ₱${price}/page

        </small>

    `;

}



/* =========================================================
   CREATE ORDER
========================================================= */

function createOrder() {

    const customerName =
        document.getElementById(
            "customerName"
        ).value.trim();


    const customerContact =
        document.getElementById(
            "customerContact"
        ).value.trim();


    const submissionChannel =
        document.getElementById(
            "submissionChannel"
        ).value;


    const paperSize =
        document.getElementById(
            "paperSize"
        ).value;


    const pages =
        Number(
            document.getElementById(
                "pages"
            ).value
        );


    const copies =
        Number(
            document.getElementById(
                "copies"
            ).value
        );


    const printType =
        document.getElementById(
            "printType"
        ).value;


    const files =
        Array.from(
            document.getElementById(
                "orderFiles"
            ).files
        );


    const threshold =
        Number(
            document.getElementById(
                "largeFileThreshold"
            ).value
        );


    if (
        !customerName
    ) {

        alert(
            "Please enter the customer's name."
        );

        return;

    }


    if (
        pages <= 0
    ) {

        alert(
            "Pages must be at least 1."
        );

        return;

    }


    if (
        copies <= 0
    ) {

        alert(
            "Copies must be at least 1."
        );

        return;

    }


    if (
        files.length === 0
    ) {

        alert(
            "Please upload at least one file."
        );

        return;

    }


    const largeFiles =
        files.filter(file => {

            const sizeMB =
                file.size /
                (
                    1024 *
                    1024
                );

            return (
                sizeMB >= threshold
            );

        });


    const pricePerPage =
        PRICE_PER_PAGE[
            printType
        ];


    const totalAmount =
        pages *
        copies *
        pricePerPage;


    const order = {

        id:
            generateOrderID(),

        customerName,

        customerContact,

        submissionChannel,

        paperSize,

        pages,

        copies,

        printType,

        pricePerPage,

        totalAmount,

        status:
            "Pending",

        largeFileApproval:
            largeFiles.length > 0
                ? "REQUIRED"
                : "Not Required",

        largeFiles,

        files:
            files.map(file => ({

                name:
                    file.name,

                size:
                    file.size,

                sizeMB:
                    (
                        file.size /
                        (
                            1024 *
                            1024
                        )
                    ).toFixed(2)

            })),

        createdAt:
            new Date()
                .toLocaleString()

    };


    orders.push(
        order
    );


    saveData();


    document.getElementById(
        "customerName"
    ).value = "";


    document.getElementById(
        "customerContact"
    ).value = "";


    document.getElementById(
        "pages"
    ).value = 1;


    document.getElementById(
        "copies"
    ).value = 1;


    document.getElementById(
        "orderFiles"
    ).value = "";


    document.getElementById(
        "fileFeedback"
    ).innerHTML = "";


    updatePricePreview();

    renderOrders();

    updatePaymentOrders();


    alert(

        "Order created successfully!\n\n" +

        "Order ID: " +
        order.id +

        "\n\n" +

        "Files: " +
        order.files.length +

        "\n" +

        "Pages: " +
        order.pages +

        "\n" +

        "Copies: " +
        order.copies +

        "\n\n" +

        "Total: " +
        formatMoney(
            order.totalAmount
        )

    );

}



/* =========================================================
   ORDER TABLE
========================================================= */

function renderOrders() {

    const container =
        document.getElementById(
            "ordersContainer"
        );


    const search =
        document.getElementById(
            "orderSearch"
        ).value
        .toLowerCase();


    const filteredOrders =
        orders.filter(
            order => {

                const files =
                    order.files
                        .map(
                            file =>
                                file.name
                        )
                        .join(" ");


                return (

                    order.id
                        .toLowerCase()
                        .includes(search)

                    ||

                    order.customerName
                        .toLowerCase()
                        .includes(search)

                    ||

                    files
                        .toLowerCase()
                        .includes(search)

                );

            }
        );


    if (
        filteredOrders.length === 0
    ) {

        container.innerHTML = `

            <div class="empty">

                No orders found.

            </div>

        `;

        return;

    }


    container.innerHTML = `

        <table>

            <thead>

                <tr>

                    <th>
                        Order ID
                    </th>

                    <th>
                        Customer
                    </th>

                    <th>
                        Channel
                    </th>

                    <th>
                        Files
                    </th>

                    <th>
                        Print Details
                    </th>

                    <th>
                        Total
                    </th>

                    <th>
                        Status
                    </th>

                    <th>
                        Action
                    </th>

                </tr>

            </thead>


            <tbody>


                ${filteredOrders.map(
                    order => `

                        <tr>

                            <td>

                                <strong>
                                    ${order.id}
                                </strong>

                                <br>

                                <span class="muted">

                                    ${order.createdAt}

                                </span>

                            </td>


                            <td>

                                ${order.customerName}

                                <br>

                                <span class="muted">

                                    ${
                                        order.customerContact ||
                                        "No contact"
                                    }

                                </span>

                            </td>


                            <td>

                                ${order.submissionChannel}

                            </td>


                            <td>

                                <strong>

                                    ${order.files.length}
                                    file(s)

                                </strong>


                                <ul class="file-list">

                                    ${
                                        order.files
                                            .map(
                                                file =>
                                                    `
                                                        <li>

                                                            ${file.name}

                                                            (
                                                            ${file.sizeMB}
                                                            MB
                                                            )

                                                        </li>
                                                    `
                                            )
                                            .join("")
                                    }

                                </ul>


                                ${
                                    order.largeFiles.length > 0

                                    ?

                                    `
                                        <span
                                            class="badge yellow"
                                        >

                                            Approval Required

                                        </span>
                                    `

                                    :

                                    ""
                                }

                            </td>


                            <td>

                                ${order.pages}
                                page(s)

                                <br>

                                ${order.copies}
                                copy/copies

                                <br>

                                ${order.paperSize}

                                <br>

                                ${order.printType}

                            </td>


                            <td>

                                <strong>

                                    ${formatMoney(
                                        order.totalAmount
                                    )}

                                </strong>

                            </td>


                            <td>

                                <select
                                    onchange="
                                        updateOrderStatus(
                                            '${order.id}',
                                            this.value
                                        )
                                    "
                                >

                                    <option
                                        value="Pending"
                                        ${
                                            order.status ===
                                            "Pending"
                                                ? "selected"
                                                : ""
                                        }
                                    >

                                        Pending

                                    </option>


                                    <option
                                        value="Printing"
                                        ${
                                            order.status ===
                                            "Printing"
                                                ? "selected"
                                                : ""
                                        }
                                    >

                                        Printing

                                    </option>


                                    <option
                                        value="Printed"
                                        ${
                                            order.status ===
                                            "Printed"
                                                ? "selected"
                                                : ""
                                        }
                                    >

                                        Printed

                                    </option>


                                    <option
                                        value="Released"
                                        ${
                                            order.status ===
                                            "Released"
                                                ? "selected"
                                                : ""
                                        }
                                    >

                                        Released

                                    </option>

                                </select>

                            </td>


                            <td>

                                <button
                                    class="danger"
                                    onclick="
                                        deleteOrder(
                                            '${order.id}'
                                        )
                                    "
                                >

                                    Delete

                                </button>

                            </td>

                        </tr>

                    `
                ).join("")}


            </tbody>

        </table>

    `;

}



/* =========================================================
   UPDATE ORDER STATUS
========================================================= */

function updateOrderStatus(
    orderID,
    newStatus
) {

    const order =
        orders.find(
            order =>
                order.id ===
                orderID
        );


    if (!order) {

        return;

    }


    order.status =
        newStatus;


    saveData();

    renderOrders();

}



/* =========================================================
   DELETE ORDER
========================================================= */

function deleteOrder(
    orderID
) {

    if (
        !confirm(
            "Delete order " +
            orderID +
            "?"
        )
    ) {

        return;

    }


    orders =
        orders.filter(
            order =>
                order.id !==
                orderID
        );


    saveData();

    renderOrders();

    updatePaymentOrders();

}



/* =========================================================
   PAYMENT ORDERS
========================================================= */

function updatePaymentOrders() {

    const select =
        document.getElementById(
            "paymentOrder"
        );


    if (
        orders.length === 0
    ) {

        select.innerHTML = `

            <option value="">

                No orders available

            </option>

        `;


        document.getElementById(
            "paymentTotal"
        ).value = "";


        return;

    }


    select.innerHTML =

        orders
            .map(
                order => `

                    <option
                        value="${order.id}"
                    >

                        ${order.id}
                        -
                        ${order.customerName}

                    </option>

                `
            )
            .join("");


    updatePaymentTotal();

}



/* =========================================================
   PAYMENT ORDER CHANGE
========================================================= */

document
    .getElementById(
        "paymentOrder"
    )
    .addEventListener(
        "change",
        updatePaymentTotal
    );



/* =========================================================
   UPDATE PAYMENT TOTAL
========================================================= */

function updatePaymentTotal() {

    const orderID =
        document.getElementById(
            "paymentOrder"
        ).value;


    const order =
        orders.find(
            order =>
                order.id ===
                orderID
        );


    if (!order) {

        document.getElementById(
            "paymentTotal"
        ).value = "";

        return;

    }


    document.getElementById(
        "paymentTotal"
    ).value =
        order.totalAmount
            .toFixed(2);

}



/* =========================================================
   GET TOTAL PAID
========================================================= */

function getTotalPaidForOrder(
    orderID
) {

    return payments

        .filter(
            payment =>
                payment.orderID ===
                orderID
        )

        .reduce(

            (
                total,
                payment
            ) => {

                /*
                    IMPORTANT:

                    We use amountApplied,
                    NOT amountGiven.

                    This prevents change from
                    being counted as extra payment.
                */

                return (
                    total +
                    Number(
                        payment.amountApplied
                    )
                );

            },

            0

        );

}



/* =========================================================
   RECORD PAYMENT
========================================================= */

function recordPayment() {

    const orderID =
        document.getElementById(
            "paymentOrder"
        ).value;


    const amountGiven =
        Number(
            document.getElementById(
                "paymentAmount"
            ).value
        );


    const method =
        document.getElementById(
            "paymentMethod"
        ).value;


    const type =
        document.getElementById(
            "paymentType"
        ).value;


    const order =
        orders.find(
            order =>
                order.id ===
                orderID
        );


    if (!order) {

        alert(
            "Please select an order."
        );

        return;

    }


    if (
        amountGiven <= 0
    ) {

        alert(
            "Payment amount must be greater than 0."
        );

        return;

    }


    const alreadyPaid =
        getTotalPaidForOrder(
            orderID
        );


    const remainingBalance =
        Math.max(

            0,

            order.totalAmount -
            alreadyPaid

        );


    /*
        Example:

        Order = ₱100

        Customer gives = ₱500

        Amount Applied = ₱100

        Change = ₱400
    */

    const amountApplied =
        Math.min(
            amountGiven,
            remainingBalance
        );


    const change =
        Math.max(

            0,

            amountGiven -
            remainingBalance

        );


    const payment = {

        id:
            generatePaymentID(),

        orderID,

        customerName:
            order.customerName,

        amountGiven,

        amountApplied,

        change,

        method,

        type,

        date:
            new Date()
                .toLocaleString()

    };


    payments.push(
        payment
    );


    saveData();


    document.getElementById(
        "paymentAmount"
    ).value = "";


    document.getElementById(
        "paymentMessage"
    ).innerHTML = `

        <div class="success">

            <strong>
                Payment recorded successfully.
            </strong>

            <br><br>

            Amount Given:

            <strong>

                ${formatMoney(
                    amountGiven
                )}

            </strong>

            <br>

            Applied to Order:

            <strong>

                ${formatMoney(
                    amountApplied
                )}

            </strong>

            <br>

            Change:

            <strong>

                ${formatMoney(
                    change
                )}

            </strong>

        </div>

    `;


    renderPayments();

    updatePaymentSummary();


    alert(

        "Payment recorded!\n\n" +

        "Amount Given: " +
        formatMoney(
            amountGiven
        ) +

        "\n" +

        "Applied: " +
        formatMoney(
            amountApplied
        ) +

        "\n" +

        "Change: " +
        formatMoney(
            change
        )

    );

}



/* =========================================================
   PAYMENT TABLE
========================================================= */

function renderPayments() {

    const container =
        document.getElementById(
            "paymentsContainer"
        );


    if (
        payments.length === 0
    ) {

        container.innerHTML = `

            <div class="empty">

                No transactions recorded yet.

            </div>

        `;

        return;

    }


    container.innerHTML = `

        <table>

            <thead>

                <tr>

                    <th>
                        Payment ID
                    </th>

                    <th>
                        Order
                    </th>

                    <th>
                        Customer
                    </th>

                    <th>
                        Amount Given
                    </th>

                    <th>
                        Applied
                    </th>

                    <th>
                        Change
                    </th>

                    <th>
                        Method
                    </th>

                    <th>
                        Type
                    </th>

                    <th>
                        Date
                    </th>

                </tr>

            </thead>


            <tbody>


                ${payments.map(
                    payment => `

                        <tr>

                            <td>

                                ${payment.id}

                            </td>


                            <td>

                                ${payment.orderID}

                            </td>


                            <td>

                                ${payment.customerName}

                            </td>


                            <td>

                                <strong>

                                    ${formatMoney(
                                        payment.amountGiven
                                    )}

                                </strong>

                            </td>


                            <td>

                                ${formatMoney(
                                    payment.amountApplied
                                )}

                            </td>


                            <td>

                                ${
                                    payment.change > 0

                                    ?

                                    `
                                        <span
                                            class="badge yellow"
                                        >

                                            ${formatMoney(
                                                payment.change
                                            )}

                                        </span>
                                    `

                                    :

                                    formatMoney(0)
                                }

                            </td>


                            <td>

                                ${payment.method}

                            </td>


                            <td>

                                <span
                                    class="badge blue"
                                >

                                    ${payment.type}

                                </span>

                            </td>


                            <td>

                                ${payment.date}

                            </td>

                        </tr>

                    `
                ).join("")}


            </tbody>

        </table>

    `;

}



/* =========================================================
   PAYMENT SUMMARY
========================================================= */

function updatePaymentSummary() {

    const totalSales =
        orders.reduce(

            (
                sum,
                order
            ) => {

                return (
                    sum +
                    Number(
                        order.totalAmount
                    )
                );

            },

            0

        );


    const totalPaid =
        payments.reduce(

            (
                sum,
                payment
            ) => {

                return (
                    sum +
                    Number(
                        payment.amountApplied
                    )
                );

            },

            0

        );


    const totalBalance =
        Math.max(

            0,

            totalSales -
            totalPaid

        );


    document.getElementById(
        "totalSales"
    ).textContent =
        formatMoney(
            totalSales
        );


    document.getElementById(
        "totalPaid"
    ).textContent =
        formatMoney(
            totalPaid
        );


    document.getElementById(
        "totalBalance"
    ).textContent =
        formatMoney(
            totalBalance
        );

}



/* =========================================================
   INVENTORY
========================================================= */

function addInventoryItem() {

    const name =
        document.getElementById(
            "inventoryName"
        ).value.trim();


    const category =
        document.getElementById(
            "inventoryCategory"
        ).value;


    const unit =
        document.getElementById(
            "inventoryUnit"
        ).value.trim();


    const shopStock =
        Number(
            document.getElementById(
                "shopStock"
            ).value
        );


    const homeStock =
        Number(
            document.getElementById(
                "homeStock"
            ).value
        );


    const reorderLevel =
        Number(
            document.getElementById(
                "reorderLevel"
            ).value
        );


    if (!name) {

        alert(
            "Please enter an item name."
        );

        return;

    }


    if (!unit) {

        alert(
            "Please enter the inventory unit."
        );

        return;

    }


    if (
        shopStock < 0 ||
        homeStock < 0
    ) {

        alert(
            "Stock cannot be negative."
        );

        return;

    }


    const item = {

        id:
            generateInventoryID(),

        name,

        category,

        unit,

        shopStock,

        homeStock,

        reorderLevel

    };


    inventory.push(
        item
    );


    saveData();


    document.getElementById(
        "inventoryName"
    ).value = "";


    document.getElementById(
        "inventoryUnit"
    ).value = "";


    document.getElementById(
        "shopStock"
    ).value = 0;


    document.getElementById(
        "homeStock"
    ).value = 0;


    document.getElementById(
        "inventoryMessage"
    ).innerHTML = `

        <div class="success">

            Inventory item added successfully.

        </div>

    `;


    renderInventory();

}



/* =========================================================
   INVENTORY TABLE
========================================================= */

function renderInventory() {

    const container =
        document.getElementById(
            "inventoryContainer"
        );


    if (
        inventory.length === 0
    ) {

        container.innerHTML = `

            <div class="empty">

                No inventory items yet.

            </div>

        `;

        return;

    }


    container.innerHTML = `

        <table>

            <thead>

                <tr>

                    <th>
                        Item
                    </th>

                    <th>
                        Category
                    </th>

                    <th>
                        Shop
                    </th>

                    <th>
                        Home
                    </th>

                    <th>
                        Total
                    </th>

                    <th>
                        Reorder Level
                    </th>

                    <th>
                        Status
                    </th>

                    <th>
                        Adjust
                    </th>

                    <th>
                        Delete
                    </th>

                </tr>

            </thead>


            <tbody>


                ${inventory.map(
                    item => {

                        const total =
                            Number(
                                item.shopStock
                            ) +
                            Number(
                                item.homeStock
                            );


                        const lowStock =
                            item.shopStock <=
                                item.reorderLevel &&

                            item.homeStock <=
                                item.reorderLevel;


                        return `

                            <tr>

                                <td>

                                    <strong>

                                        ${item.name}

                                    </strong>

                                </td>


                                <td>

                                    ${item.category}

                                </td>


                                <td>

                                    ${item.shopStock}
                                    ${item.unit}

                                </td>


                                <td>

                                    ${item.homeStock}
                                    ${item.unit}

                                </td>


                                <td>

                                    <strong>

                                        ${total}
                                        ${item.unit}

                                    </strong>

                                </td>


                                <td>

                                    ${item.reorderLevel}

                                </td>


                                <td>

                                    ${
                                        lowStock

                                        ?

                                        `
                                            <span
                                                class="badge red"
                                            >

                                                LOW STOCK

                                            </span>
                                        `

                                        :

                                        `
                                            <span
                                                class="badge green"
                                            >

                                                OK

                                            </span>
                                        `
                                    }

                                </td>


                                <td>


                                    <button
                                        class="small"
                                        onclick="
                                            adjustStock(
                                                '${item.id}',
                                                'shop',
                                                1
                                            )
                                        "
                                    >

                                        + Shop

                                    </button>


                                    <button
                                        class="small"
                                        onclick="
                                            adjustStock(
                                                '${item.id}',
                                                'shop',
                                                -1
                                            )
                                        "
                                    >

                                        - Shop

                                    </button>


                                    <br>


                                    <button
                                        class="small"
                                        onclick="
                                            adjustStock(
                                                '${item.id}',
                                                'home',
                                                1
                                            )
                                        "
                                    >

                                        + Home

                                    </button>


                                    <button
                                        class="small"
                                        onclick="
                                            adjustStock(
                                                '${item.id}',
                                                'home',
                                                -1
                                            )
                                        "
                                    >

                                        - Home

                                    </button>


                                </td>


                                <td>

                                    <button
                                        class="danger"
                                        onclick="
                                            deleteInventory(
                                                '${item.id}'
                                            )
                                        "
                                    >

                                        Delete

                                    </button>

                                </td>

                            </tr>

                        `;

                    }
                ).join("")}


            </tbody>

        </table>

    `;

}



/* =========================================================
   ADJUST STOCK
========================================================= */

function adjustStock(
    itemID,
    location,
    amount
) {

    const item =
        inventory.find(
            item =>
                item.id ===
                itemID
        );


    if (!item) {

        return;

    }


    if (
        location === "shop"
    ) {

        item.shopStock =
            Math.max(

                0,

                item.shopStock +
                amount

            );

    }


    if (
        location === "home"
    ) {

        item.homeStock =
            Math.max(

                0,

                item.homeStock +
                amount

            );

    }


    saveData();

    renderInventory();

}



/* =========================================================
   DELETE INVENTORY
========================================================= */

function deleteInventory(
    itemID
) {

    if (
        !confirm(
            "Delete this inventory item?"
        )
    ) {

        return;

    }


    inventory =
        inventory.filter(
            item =>
                item.id !==
                itemID
        );


    saveData();

    renderInventory();

}



/* =========================================================
   STARTER INVENTORY
========================================================= */

function addStarterInventory() {

    /*
        Don't overwrite existing
        inventory.

        This only runs the first
        time the system is opened.
    */

    if (
        inventory.length > 0
    ) {

        return;

    }


    inventory = [

        {

            id: "INV-001",

            name:
                "Bond Paper",

            category:
                "Bond Paper",

            unit:
                "box",

            shopStock:
                2,

            homeStock:
                2,

            reorderLevel:
                1

        },


        {

            id: "INV-002",

            name:
                "Photo Paper",

            category:
                "Photo Paper",

            unit:
                "pack",

            shopStock:
                3,

            homeStock:
                1,

            reorderLevel:
                1

        },


        {

            id: "INV-003",

            name:
                "Black Ink",

            category:
                "Ink/Toner",

            unit:
                "bottle",

            shopStock:
                2,

            homeStock:
                1,

            reorderLevel:
                1

        }

    ];


    saveData();

}



/* =========================================================
   REFRESH
========================================================= */

function refreshEverything() {

    renderOrders();

    updatePaymentOrders();

    renderPayments();

    updatePaymentSummary();

    renderInventory();

    updatePricePreview();

}



/* =========================================================
   START
========================================================= */

addStarterInventory();

refreshEverything();


</script>


</body>

</html>
