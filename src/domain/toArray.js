/**
 * Generic array validator - ensures the input is an array
 * @param {any} data - The data to validate
 * @returns {Array} - Returns the data if it's an array, otherwise empty array
 */
export const toArray = (data) => Array.isArray(data) ? data : [];
