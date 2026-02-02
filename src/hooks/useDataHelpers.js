import { useMemo } from 'react';

/**
 * Creates a Map from an array indexed by id
 * @param {Array} items - Array of items with id property
 * @returns {Map} - Map with id as key
 */
export const useIdMap = (items) => {
  return useMemo(() => {
    const map = new Map();
    for (const item of items || []) {
      map.set(String(item.id), item);
    }
    return map;
  }, [items]);
};

/**
 * Filter users by role
 * @param {Array} users - Array of users
 * @param {string} role - Role to filter by
 * @returns {Array} - Filtered users
 */
export const useFilteredUsers = (users, role) => {
  return useMemo(() => {
    return (users || []).filter(user => user.role === role);
  }, [users, role]);
};
