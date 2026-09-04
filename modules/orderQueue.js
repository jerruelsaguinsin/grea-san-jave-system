// modules/orderQueue.js
// Module 4: Order Queue & Priority Management
// Two lanes: walk-in queue (FIFO) and rush/advance queue (also FIFO within itself,
// but always served before walk-ins). Data is stored in in-memory arrays for now —
// swap these arrays for real database calls later without changing the function logic.

import { ORDER_STATUS } from "../constants.js";

let walkInQueue = [];   // regular on-the-spot orders, first-come-first-served
let rushQueue = [];     // rush / advance orders, served ahead of walk-ins
let nextOrderId = 1;

/**
 * Adds a new order to the appropriate queue.
 * @param {Object} orderDetails - e.g. { customerName, fileName, pages, copies, colorTier }
 * @param {boolean} isRush - true if this is a rush/advance order
 * @returns {Object} the created order (with id, timestamp, and queue type)
 */
function addToQueue(orderDetails, isRush = false) {
  if (!orderDetails || !orderDetails.customerName) {
    throw new Error("orderDetails.customerName is required");
  }

  const order = {
    id: nextOrderId++,
    ...orderDetails,
    isRush,
    status: ORDER_STATUS.QUEUED,
    dateAdded: new Date().toISOString(),
  };

  if (isRush) {
    rushQueue.push(order);
  } else {
    walkInQueue.push(order);
  }

  return order;
}

/**
 * Returns the next order to be printed.
 * Rush queue is always drained first; only when it's empty do we serve walk-ins.
 * @returns {Object|null} the next order, or null if both queues are empty
 */
function getNextOrder() {
  if (rushQueue.length > 0) {
    return rushQueue[0];
  }
  if (walkInQueue.length > 0) {
    return walkInQueue[0];
  }
  return null;
}

/**
 * Marks the next order as done and removes it from its queue.
 * @returns {Object|null} the completed order, or null if nothing was queued
 */
function completeNextOrder() {
  let completed = null;

  if (rushQueue.length > 0) {
    completed = rushQueue.shift();
  } else if (walkInQueue.length > 0) {
    completed = walkInQueue.shift();
  }

  if (completed) {
    completed.status = ORDER_STATUS.DONE;
    completed.dateCompleted = new Date().toISOString();
  }

  return completed;
}

/** Returns a read-only snapshot of both queues, in serve order. */
function getQueueSnapshot() {
  return {
    rushQueue: [...rushQueue],
    walkInQueue: [...walkInQueue],
    totalPending: rushQueue.length + walkInQueue.length,
  };
}

/** Removes an order by id from whichever queue it's in (e.g. customer cancels). */
function removeFromQueue(orderId) {
  const beforeRush = rushQueue.length;
  rushQueue = rushQueue.filter((o) => o.id !== orderId);
  if (rushQueue.length !== beforeRush) return true;

  const beforeWalkIn = walkInQueue.length;
  walkInQueue = walkInQueue.filter((o) => o.id !== orderId);
  return walkInQueue.length !== beforeWalkIn;
}

/** Test/reset helper — clears both queues and resets the id counter. */
function _resetForTests() {
  walkInQueue = [];
  rushQueue = [];
  nextOrderId = 1;
}

export {
  addToQueue,
  getNextOrder,
  completeNextOrder,
  getQueueSnapshot,
  removeFromQueue,
  _resetForTests,
};
