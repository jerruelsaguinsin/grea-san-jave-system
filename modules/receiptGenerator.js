// modules/receiptGenerator.js
// Module 8: Acknowledgment Receipt Generation
// Builds the receipt that gets stapled to printed output, so a customer's files
// never get mixed up with someone else's. Receipts are stored in an in-memory
// array for now — swap for a real database/table later without changing the logic.

let receipts = [];
let nextReceiptId = 1;

/**
 * Generates an acknowledgment receipt for a completed/queued order.
 * @param {Object} order - the order object (expects id, customerName, fileName, pages, copies, colorTier, price)
 * @returns {Object} the generated receipt
 */
function generateReceipt(order) {
  if (!order || !order.id || !order.customerName) {
    throw new Error("A valid order (with id and customerName) is required");
  }

  const receipt = {
    receiptId: nextReceiptId++,
    orderId: order.id,
    customerName: order.customerName,
    fileName: order.fileName || "N/A",
    pages: order.pages || 0,
    copies: order.copies || 1,
    colorTier: order.colorTier || "N/A",
    totalPrice: order.totalPrice ?? 0,
    isRush: order.isRush || false,
    dateIssued: new Date().toISOString(),
  };

  receipts.push(receipt);
  return receipt;
}

/**
 * Formats a receipt as plain text, ready to print/staple to the output
 * (mirrors what the shop currently writes by hand).
 * @param {number} receiptId
 * @returns {string} formatted receipt text
 */
function printReceiptText(receiptId) {
  const receipt = receipts.find((r) => r.receiptId === receiptId);
  if (!receipt) throw new Error(`Receipt ${receiptId} not found`);

  return [
    "===== ACKNOWLEDGMENT RECEIPT =====",
    `Receipt No: ${receipt.receiptId}`,
    `Order No:   ${receipt.orderId}`,
    `Customer:   ${receipt.customerName}`,
    `File:       ${receipt.fileName}`,
    `Pages:      ${receipt.pages}`,
    `Copies:     ${receipt.copies}`,
    `Color Tier: ${receipt.colorTier}`,
    `Priority:   ${receipt.isRush ? "RUSH" : "Regular"}`,
    `Price:      PHP ${Number(receipt.totalPrice).toFixed(2)}`,
    `Date:       ${receipt.dateIssued}`,
    "===================================",
  ].join("\n");
}

/** Finds a receipt by its order id (useful for looking up "was this order's receipt made?"). */
function getReceiptByOrderId(orderId) {
  return receipts.find((r) => r.orderId === orderId) || null;
}

/** Returns all receipts issued so far. */
function getAllReceipts() {
  return [...receipts];
}

/** Test/reset helper — clears all receipts and resets the id counter. */
function _resetForTests() {
  receipts = [];
  nextReceiptId = 1;
}

export {
  generateReceipt,
  printReceiptText,
  getReceiptByOrderId,
  getAllReceipts,
  _resetForTests,
};
