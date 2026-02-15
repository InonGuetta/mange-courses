import { useMemo } from 'react';

export const useIdMap = (items) => {
  return useMemo(() => {
    const map = new Map();
    for (const item of items || []) {
      map.set(String(item.id), item);
    }
    return map;
  }, [items]);
};

export const useFilteredUsers = (users, role) => {
  return useMemo(() => {
    return (users || []).filter(({role}) => role === role);
  }, [users, role]);
};
