// modules/salesReporting.js
// Module 14: Sales & Financial Reporting
// Stores sales transactions and calculates total sales. The system traverses
// each transaction and adds the individual amounts to produce a daily, weekly,
// or monthly total, and only counts orders whose status is Completed.
// Report data is calculated in memory for now - swap it for real database
// queries later without changing the reporting logic.

const ORDER_STATUS = {
  QUEUED: 'Pending',
  PRINTING: 'Printing',
  DONE: 'Completed',
  UNCLAIMED: 'Unclaimed',
  CANCELLED: 'Cancelled'
};

/** Returns only completed orders, optionally limited to one calendar date. */
function getCompletedOrders(orders = [], reportDate = null) {
  return orders.filter((order) => {
    if (order.status !== ORDER_STATUS.DONE) return false;
    if (!reportDate) return true;
    return String(order.dateCompleted || order.dateAdded).slice(0, 10) === reportDate;
  });
}

/**
 * Builds the sales-report shape from completed orders.
 * @param {Array} orders
 * @param {string|null} reportDate - ISO date, such as 2026-09-05
 * @returns {Object} sales report entry
 */
function buildSalesReport(orders = [], reportDate = null) {
  const date = reportDate || new Date().toISOString().slice(0, 10);
  return buildPeriodSummary(orders, 'daily', date);
}

/**
 * Builds a summary for a daily, weekly, or monthly reporting period.
 * @param {Array} orders - completed and active orders
 * @param {'daily'|'weekly'|'monthly'} period
 * @param {string|Date} referenceDate - date inside the requested period
 * @param {boolean} isExamWeek - marks seasonal exam-week income
 * @returns {Object} sales report entry with the shared schema fields
 */
function buildPeriodSummary(orders = [], period = 'daily', referenceDate = new Date(), isExamWeek = false) {
  const reference = new Date(referenceDate);
  if (Number.isNaN(reference.getTime())) throw new Error('A valid reference date is required');

  const start = new Date(reference);
  const end = new Date(reference);
  if (period === 'weekly') {
    const day = start.getDay();
    start.setDate(start.getDate() - (day === 0 ? 6 : day - 1));
    end.setTime(start.getTime());
    end.setDate(end.getDate() + 6);
  } else if (period === 'monthly') {
    start.setDate(1);
    end.setMonth(end.getMonth() + 1, 0);
  }

  start.setHours(0, 0, 0, 0);
  end.setHours(23, 59, 59, 999);
  const completedOrders = orders.filter((order) => {
    if (order.status !== ORDER_STATUS.DONE) return false;
    const completedDate = new Date(order.dateCompleted || order.dateAdded);
    return completedDate >= start && completedDate <= end;
  });

  return {
    reportDate: reference.toISOString().slice(0, 10),
    totalOrders: completedOrders.length,
    totalRevenue: completedOrders.reduce((sum, order) => sum + Number(order.totalPrice || 0), 0),
    totalRushOrders: completedOrders.filter((order) => order.isRush).length,
    isExamWeek
  };
}

/** Generates the daily sales summary used to replace the daily Excel log. */
function generateDailySummary(orders = [], reportDate = new Date(), isExamWeek = false) {
  return buildPeriodSummary(orders, 'daily', reportDate, isExamWeek);
}

/** Generates a Monday-to-Sunday sales summary for weekly trend checking. */
function generateWeeklySummary(orders = [], referenceDate = new Date(), isExamWeek = false) {
  return buildPeriodSummary(orders, 'weekly', referenceDate, isExamWeek);
}

/** Generates a calendar-month sales summary for seasonal income comparison. */
function generateMonthlySummary(orders = [], referenceDate = new Date(), isExamWeek = false) {
  return buildPeriodSummary(orders, 'monthly', referenceDate, isExamWeek);
}

/** Formats a report value as Philippine pesos for the dashboard. */
function formatCurrency(amount) {
  return `PHP ${Number(amount || 0).toFixed(2)}`;
}

export {
  getCompletedOrders,
  buildSalesReport,
  buildPeriodSummary,
  generateDailySummary,
  generateWeeklySummary,
  generateMonthlySummary,
  formatCurrency
};
