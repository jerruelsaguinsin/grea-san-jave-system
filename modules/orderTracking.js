// modules/orderTracking.js
// Module 6: Order Status Tracking
// Organizes printing orders according to their arrival sequence. The first
// order added to the queue is the first order processed, while Rush orders can
// be given priority when necessary.
// Order data is stored in memory for now - swap it for database calls later
// without changing the logic.

import {
  COLOR_TIERS,
  ORDER_CHANNELS,
  ORDER_STATUS,
  PAYMENT_METHODS,
  PAYMENT_STATUS,
  PRICE_PER_PAGE,
  PROMO_TYPES,
  QUEUE_TYPES,
  SERVICE_OPTIONS,
  SERVICE_TYPES
} from '../constants.js';

let nextOrderId = 1001;

function isKnownValue(value, values) {
  for (const key in values) {
    if (values[key] === value) return true;
  }
  return false;
}

/**
 * Creates a complete order using the shared schema field names.
 * @param {Object} orderDetails - customer, file, print, and queue details
 * @returns {Object} a schema-compliant order
 */
function createOrder(orderDetails = {}) {
  // Normalize form values once so every module receives the same data types.
  const pages = Number(orderDetails.pages) || 1;
  const copies = Number(orderDetails.copies) || 1;
  const requestedColorTier = orderDetails.colorTier || COLOR_TIERS.BLACK_TEXT;
  const colorTier = isKnownValue(requestedColorTier, COLOR_TIERS)
    ? requestedColorTier
    : COLOR_TIERS.BLACK_TEXT;
  const isRush = Boolean(orderDetails.isRush);
  const requestedQueueType = orderDetails.queueType || QUEUE_TYPES.WALK_IN;
  const queueType = isKnownValue(requestedQueueType, QUEUE_TYPES)
    ? requestedQueueType
    : QUEUE_TYPES.WALK_IN;
  const requestedServiceType = orderDetails.serviceType || SERVICE_TYPES.DOCUMENT_PRINTING;
  const serviceType = isKnownValue(requestedServiceType, SERVICE_TYPES)
    ? requestedServiceType
    : SERVICE_TYPES.DOCUMENT_PRINTING;
  const requestedServiceOption = orderDetails.serviceOption || SERVICE_OPTIONS.NONE;
  const serviceOption = isKnownValue(requestedServiceOption, SERVICE_OPTIONS)
    ? requestedServiceOption
    : SERVICE_OPTIONS.NONE;
  const requestedPromoType = orderDetails.promoType || PROMO_TYPES.NONE;
  const promoType = isKnownValue(requestedPromoType, PROMO_TYPES)
    ? requestedPromoType
    : PROMO_TYPES.NONE;
  const dateAdded = orderDetails.dateAdded || new Date().toISOString();
  const pricePerPage = PRICE_PER_PAGE[colorTier] || PRICE_PER_PAGE[COLOR_TIERS.BLACK_TEXT];
  const baseTotalPrice = pricePerPage * pages * copies;
  const requestedDiscount = Number(orderDetails.discountAmount) || 0;
  const discountAmount = Math.max(0, Math.min(requestedDiscount, baseTotalPrice));
  const requestedFileChannel = orderDetails.fileChannel || ORDER_CHANNELS.IN_PERSON;
  const fileChannel = isKnownValue(requestedFileChannel, ORDER_CHANNELS)
    ? requestedFileChannel
    : ORDER_CHANNELS.IN_PERSON;
  const requestedPaymentMethod = orderDetails.paymentMethod || PAYMENT_METHODS.CASH;
  const paymentMethod = isKnownValue(requestedPaymentMethod, PAYMENT_METHODS)
    ? requestedPaymentMethod
    : PAYMENT_METHODS.CASH;
  const requestedPaymentStatus = orderDetails.paymentStatus || PAYMENT_STATUS.PENDING;
  const paymentStatus = isKnownValue(requestedPaymentStatus, PAYMENT_STATUS)
    ? requestedPaymentStatus
    : PAYMENT_STATUS.PENDING;
  const requestedStatus = orderDetails.status || ORDER_STATUS.QUEUED;
  const status = isKnownValue(requestedStatus, ORDER_STATUS)
    ? requestedStatus
    : ORDER_STATUS.QUEUED;

  // Return one complete order that follows every field in the shared schema.
  return {
    orderId: nextOrderId++,
    customerId: orderDetails.customerId || 1,
    customerName: orderDetails.customerName || '',
    fileName: orderDetails.fileName || '',
    fileChannel,
    fileCount: Number(orderDetails.fileCount) || 1,
    subject: orderDetails.subject || '',
    notes: orderDetails.notes || '',
    paperSize: orderDetails.paperSize || 'A4',
    pages,
    copies,
    colorTier,
    isRush,
    queueType,
    serviceType,
    serviceOption,
    pricePerPage,
    baseTotalPrice,
    promoType,
    discountAmount,
    totalPrice: baseTotalPrice - discountAmount,
    requiresDownPayment: Boolean(orderDetails.requiresDownPayment),
    downPaymentAmount: Number(orderDetails.downPaymentAmount) || 0,
    paymentMethod,
    paymentStatus,
    status,
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

  const sortQueue = (queue) => {
    const sortedQueue = [];
    for (let index = 0; index < queue.length; index += 1) {
      const order = queue[index];
      let insertAt = sortedQueue.length;
      for (let sortedIndex = 0; sortedIndex < sortedQueue.length; sortedIndex += 1) {
        if (sortByArrival(order, sortedQueue[sortedIndex]) < 0) {
          insertAt = sortedIndex;
          break;
        }
      }
      for (let shiftIndex = sortedQueue.length; shiftIndex > insertAt; shiftIndex -= 1) {
        sortedQueue[shiftIndex] = sortedQueue[shiftIndex - 1];
      }
      sortedQueue[insertAt] = order;
    }
    return sortedQueue;
  };

  const rushOrders = [];
  const normalOrders = [];
  for (let index = 0; index < orders.length; index += 1) {
    const order = orders[index];
    if (order.status !== ORDER_STATUS.QUEUED) continue;
    if (order.isRush) rushOrders[rushOrders.length] = order;
    else normalOrders[normalOrders.length] = order;
  }

  return {
    rushQueue: sortQueue(rushOrders),
    normalQueue: sortQueue(normalOrders)
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
  const printedOrders = [];
  for (let index = 0; index < orders.length; index += 1) {
    const order = orders[index];
    if (order.status !== ORDER_STATUS.DONE) continue;
    const orderDate = new Date(order.dateCompleted || order.dateAdded);
    let insertAt = printedOrders.length;
    for (let printedIndex = 0; printedIndex < printedOrders.length; printedIndex += 1) {
      const printedDate = new Date(printedOrders[printedIndex].dateCompleted || printedOrders[printedIndex].dateAdded);
      if (orderDate > printedDate) {
        insertAt = printedIndex;
        break;
      }
    }
    for (let shiftIndex = printedOrders.length; shiftIndex > insertAt; shiftIndex -= 1) {
      printedOrders[shiftIndex] = printedOrders[shiftIndex - 1];
    }
    printedOrders[insertAt] = order;
  }
  return printedOrders;
}

/**
 * Returns orders that still need printing, in the order they arrived.
 * This gives staff a reliable print list instead of relying on message order.
 * @param {Array} orders - the current orders collection
 * @returns {Array} queued, printing, or otherwise unfinished orders
 */
function getUnprintedOrders(orders = []) {
  const queues = createQueues(orders);
  const unprintedOrders = [];
  for (let index = 0; index < queues.rushQueue.length; index += 1) {
    unprintedOrders[unprintedOrders.length] = queues.rushQueue[index];
  }
  for (let index = 0; index < queues.normalQueue.length; index += 1) {
    unprintedOrders[unprintedOrders.length] = queues.normalQueue[index];
  }
  return unprintedOrders;
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
