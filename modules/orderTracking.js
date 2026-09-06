// modules/orderTracking.js
// Module 6: Order Status Tracking
// Organizes printing orders according to their arrival sequence. The first
// order added to the queue is the first order processed, while Rush orders can
// be given priority when necessary.
// Order data is stored in memory for now - swap it for database calls later
// without changing the logic.

const COLOR_TIERS = {
  BLACK_TEXT: 'Black Text',
  MINIMAL_COLOR: 'Minimal Color',
  SMALL_IMAGE: 'Small Image',
  FULL_COLOR: 'Full Color'
};

const PRICE_PER_PAGE = {
  [COLOR_TIERS.BLACK_TEXT]: 3,
  [COLOR_TIERS.MINIMAL_COLOR]: 5,
  [COLOR_TIERS.SMALL_IMAGE]: 10,
  [COLOR_TIERS.FULL_COLOR]: 20
};

const ORDER_CHANNELS = {
  MESSENGER: 'Messenger',
  EMAIL: 'Email',
  IN_PERSON: 'In Person',
  BLUETOOTH: 'Bluetooth'
};

const ORDER_STATUS = {
  QUEUED: 'Pending',
  PRINTING: 'Printing',
  DONE: 'Completed',
  UNCLAIMED: 'Unclaimed',
  CANCELLED: 'Cancelled'
};

const PAYMENT_STATUS = {
  PENDING: 'pending',
  DOWN_PAYMENT_PAID: 'downPaymentPaid',
  FULLY_PAID: 'fullyPaid'
};

let nextOrderId = 1001;

/**
 * Creates a complete order using the shared schema field names.
 * @param {Object} orderDetails - customer, file, print, and queue details
 * @returns {Object} a schema-compliant order
 */
function createOrder(orderDetails = {}) {
  // Normalize form values once so every module receives the same data types.
  const pages = Number(orderDetails.pages) || 1;
  const copies = Number(orderDetails.copies) || 1;
  const colorTier = orderDetails.colorTier || COLOR_TIERS.BLACK_TEXT;
  const isRush = Boolean(orderDetails.isRush);
  const dateAdded = orderDetails.dateAdded || new Date().toISOString();
  const pricePerPage = PRICE_PER_PAGE[colorTier] || PRICE_PER_PAGE[COLOR_TIERS.BLACK_TEXT];

  // Return one complete order that follows every field in the shared schema.
  return {
    orderId: nextOrderId++,
    customerId: orderDetails.customerId || 1,
    customerName: orderDetails.customerName || '',
    fileName: orderDetails.fileName || '',
    fileChannel: orderDetails.fileChannel || ORDER_CHANNELS.IN_PERSON,
    fileCount: Number(orderDetails.fileCount) || 1,
    subject: orderDetails.subject || '',
    notes: orderDetails.notes || '',
    paperSize: orderDetails.paperSize || 'A4',
    pages,
    copies,
    colorTier,
    isRush,
    pricePerPage,
    totalPrice: pricePerPage * pages * copies,
    requiresDownPayment: Boolean(orderDetails.requiresDownPayment),
    downPaymentAmount: Number(orderDetails.downPaymentAmount) || 0,
    paymentMethod: orderDetails.paymentMethod || '',
    paymentStatus: orderDetails.paymentStatus || PAYMENT_STATUS.PENDING,
    status: orderDetails.status || ORDER_STATUS.QUEUED,
    printerId: orderDetails.printerId || null,
    dateAdded,
    dateCompleted: orderDetails.dateCompleted || null,
    unclaimedReason: orderDetails.unclaimedReason || null
  };
}

/** Returns the display number used on receipts */
function getOrderNumber(order) {
  return `GSJ-${order.orderId}`;
}

/** Creates rush and normal queues from pending orders. */
function createQueues(orders = []) {
  const sortByArrival = (first, second) => {
    const arrivalDifference = new Date(first.dateAdded) - new Date(second.dateAdded);
    return arrivalDifference || first.orderId - second.orderId;
  };

  return {
    rushQueue: orders
      .filter((order) => order.isRush && order.status === ORDER_STATUS.QUEUED)
      .sort(sortByArrival),
    normalQueue: orders
      .filter((order) => !order.isRush && order.status === ORDER_STATUS.QUEUED)
      .sort(sortByArrival)
  };
}

/** Adds an order to its corresponding queue. */
function enqueueOrder(order, queues) {
  if (!order || !queues) return false;

  const targetQueue = order.isRush ? queues.rushQueue : queues.normalQueue;
  const updatedQueue = [];

  for (let index = 0; index < targetQueue.length; index += 1) {
    updatedQueue[index] = targetQueue[index];
  }

  updatedQueue[updatedQueue.length] = order;

  if (order.isRush) queues.rushQueue = updatedQueue;
  else queues.normalQueue = updatedQueue;

  return true;
}

/** Returns the next rush order, or the next normal order when no rush order exists. */
function getNextOrder(queues) {
  if (!queues) return null;
  return queues.rushQueue[0] || queues.normalQueue[0] || null;
}

/** Removes and returns the next order to process. */
function dequeueOrder(queues) {
  if (!queues) return null;

  const activeQueue = queues.rushQueue.length > 0 ? queues.rushQueue : queues.normalQueue;
  if (activeQueue.length === 0) return null;

  const nextOrder = activeQueue[0];
  const remainingQueue = [];

  for (let index = 1; index < activeQueue.length; index += 1) {
    remainingQueue[remainingQueue.length] = activeQueue[index];
  }

  if (queues.rushQueue.length > 0) queues.rushQueue = remainingQueue;
  else queues.normalQueue = remainingQueue;

  return nextOrder;
}

/**
 * Returns orders that have already been printed, newest completion first.
 * Cancelled orders are excluded because they were not printed successfully.
 * @param {Array} orders - the current orders collection
 * @returns {Array} completed orders
 */
function getPrintedOrders(orders = []) {
  return orders
    .filter((order) => order.status === ORDER_STATUS.DONE)
    .sort((first, second) => {
      const firstDate = new Date(first.dateCompleted || first.dateAdded);
      const secondDate = new Date(second.dateCompleted || second.dateAdded);
      return secondDate - firstDate;
    });
}

/**
 * Returns orders that still need printing, in the order they arrived.
 * This gives staff a reliable print list instead of relying on message order.
 * @param {Array} orders - the current orders collection
 * @returns {Array} queued, printing, or otherwise unfinished orders
 */
function getUnprintedOrders(orders = []) {
  const queues = createQueues(orders);
  return [...queues.rushQueue, ...queues.normalQueue];
}

/**
 * Separates an order collection into printed and unprinted files.
 * @param {Array} orders - the current orders collection
 * @returns {{printedOrders: Array, unprintedOrders: Array}}
 */
function getPrintTrackingSnapshot(orders = []) {
  return {
    printedOrders: getPrintedOrders(orders),
    unprintedOrders: getUnprintedOrders(orders)
  };
}

/** Marks an order as printing on the selected printer. */
function markOrderPrinting(order, printerId = null) {
  if (!order || order.status !== ORDER_STATUS.QUEUED) return false;
  order.status = ORDER_STATUS.PRINTING;
  order.printerId = printerId;
  return true;
}

/** Marks an order done and records its completion timestamp. */
function completeOrder(order) {
  if (!order || order.status !== ORDER_STATUS.PRINTING) return false;
  order.status = ORDER_STATUS.DONE;
  order.dateCompleted = new Date().toISOString();
  return true;
}

/** Cancels an order that has not been completed. */
function cancelOrder(order, reason = null) {
  if (!order || order.status === ORDER_STATUS.DONE) return false;
  order.status = ORDER_STATUS.CANCELLED;
  order.unclaimedReason = reason;
  return true;
}

/** Test/reset helper for the in-memory id generator. */
function _resetForTests() {
  nextOrderId = 1001;
}

export {
  createOrder,
  getOrderNumber,
  createQueues,
  enqueueOrder,
  getNextOrder,
  dequeueOrder,
  getPrintedOrders,
  getUnprintedOrders,
  getPrintTrackingSnapshot,
  markOrderPrinting,
  completeOrder,
  cancelOrder,
  _resetForTests
};
