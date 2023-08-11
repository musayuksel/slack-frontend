import { useState, useEffect } from 'react';
import { type UseSessionStorageResult } from './useSessionStorage.interface';

export const useSessionStorage = <T>({
  key,
  initialValue,
}: {
  key: string;
  initialValue: T;
}): UseSessionStorageResult<T> => {
  const getCurrentOrSetInitialValue = (): T => {
    let currentValue: T = initialValue;

    const storedValue = sessionStorage.getItem(key);
    if (storedValue !== null) {
      currentValue = JSON.parse(storedValue);
    }

    return currentValue;
  };

  const [storedValue, setStoredValue] = useState<T>(getCurrentOrSetInitialValue());

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(storedValue));
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
};
