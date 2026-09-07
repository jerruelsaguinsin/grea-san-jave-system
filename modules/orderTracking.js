// Module 6: Order Status Tracking
// Handles queue priority and order lifecycle fields only.

import { ORDER_STATUS, QUEUE_TYPES } from '../constants.js';

function sortByArrival(first, second) {
  const arrivalDifference = new Date(first.dateAdded) - new Date(second.dateAdded);
  return arrivalDifference || first.orderId - second.orderId;
}

function sortQueue(queue) {
  // Insert each order into arrival order with indexed insertion.
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
}

function createQueues(orders = []) {
  // Module 6 only separates already-created orders into rush and normal lanes.
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

function enqueueOrder(order, queues) {
  // Copy the selected lane before adding the order so the original array is not mutated.
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

function getNextOrder(queues) {
  if (!queues) return null;
  return queues.rushQueue[0] || queues.normalQueue[0] || null;
}

function dequeueOrder(queues) {
  // Remove the first active order by copying every later item one position forward.
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

function getPrintTrackingSnapshot(orders = []) {
  return {
    printedOrders: getPrintedOrders(orders),
    unprintedOrders: getUnprintedOrders(orders)
  };
}

function markOrderPrinting(order, printerId = null) {
  // Tracking changes only lifecycle fields; intake and pricing belong elsewhere.
  if (!order || order.status !== ORDER_STATUS.QUEUED) return false;
  order.status = ORDER_STATUS.PRINTING;
  order.printerId = printerId;
  return true;
}

function completeOrder(order) {
  if (!order || order.status !== ORDER_STATUS.PRINTING) return false;
  order.status = ORDER_STATUS.DONE;
  order.dateCompleted = new Date().toISOString();
  return true;
}

function cancelOrder(order, reason = null) {
  if (!order || order.status === ORDER_STATUS.DONE) return false;
  order.status = ORDER_STATUS.CANCELLED;
  order.unclaimedReason = reason;
  return true;
}

function setQueueType(order, queueType) {
  if (!order || (queueType !== QUEUE_TYPES.WALK_IN && queueType !== QUEUE_TYPES.ADVANCE)) return false;
  order.queueType = queueType;
  order.isRush = queueType === QUEUE_TYPES.ADVANCE;
  return true;
}

export {
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
  setQueueType
};
