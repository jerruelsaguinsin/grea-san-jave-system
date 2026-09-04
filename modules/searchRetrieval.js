// modules/searchRetrieval.js
// Module 13: Search & Retrieval
// Lets staff search orders by customer name, file name, or subject/keyword —
// replacing manual scrolling through Messenger chat history.
// Takes an array of orders as input (in-memory "database" for now).

/**
 * Case-insensitive partial match on a single field.
 * @param {string} fieldValue
 * @param {string} query
 */
function matchesQuery(fieldValue, query) {
  if (!fieldValue) return false;
  return fieldValue.toLowerCase().includes(query.toLowerCase());
}

/**
 * Searches an array of orders by customer name.
 * @param {Array} orders
 * @param {string} name
 * @returns {Array} matching orders
 */
function searchByCustomerName(orders, name) {
  if (!name) return [];
  return orders.filter((o) => matchesQuery(o.customerName, name));
}

/**
 * Searches an array of orders by file name.
 * @param {Array} orders
 * @param {string} fileName
 * @returns {Array} matching orders
 */
function searchByFileName(orders, fileName) {
  if (!fileName) return [];
  return orders.filter((o) => matchesQuery(o.fileName, fileName));
}

/**
 * Searches an array of orders by a free-text subject/keyword,
 * checking customer name, file name, and any notes/subject field.
 * @param {Array} orders
 * @param {string} keyword
 * @returns {Array} matching orders
 */
function searchBySubject(orders, keyword) {
  if (!keyword) return [];
  return orders.filter(
    (o) =>
      matchesQuery(o.customerName, keyword) ||
      matchesQuery(o.fileName, keyword) ||
      matchesQuery(o.subject, keyword) ||
      matchesQuery(o.notes, keyword)
  );
}

/**
 * Combined search across all fields at once — a single search bar
 * that checks name, file name, and subject/notes in one call.
 * @param {Array} orders
 * @param {string} query
 * @returns {Array} matching orders, duplicates removed
 */
function searchAll(orders, query) {
  if (!query) return [];
  const results = new Map();

  [
    ...searchByCustomerName(orders, query),
    ...searchByFileName(orders, query),
    ...searchBySubject(orders, query),
  ].forEach((order) => results.set(order.id, order));

  return [...results.values()];
}

/**
 * Filters orders by a date range (inclusive), useful for narrowing search results.
 * @param {Array} orders
 * @param {string} startDateISO
 * @param {string} endDateISO
 */
function searchByDateRange(orders, startDateISO, endDateISO) {
  const start = new Date(startDateISO).getTime();
  const end = new Date(endDateISO).getTime();
  return orders.filter((o) => {
    const added = new Date(o.dateAdded).getTime();
    return added >= start && added <= end;
  });
}

export {
  searchByCustomerName,
  searchByFileName,
  searchBySubject,
  searchAll,
  searchByDateRange,
};
