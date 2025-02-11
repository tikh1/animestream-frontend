// hooks/useLocalStorageText.ts
import { useState, useEffect } from 'react';

function useLocalStorage(key: string, initialValue: string): [string, (value: string) => void] {
  const [storedValue, setStoredValue] = useState<string>(() => {
    // Sunucu tarafında çalışıyorsa, initialValue'yu döndür
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      // İstemci tarafında localStorage'dan değeri al
      const item = window.localStorage.getItem(key);
      return item ? item : initialValue;
    } catch (error) {
      console.error('Error accessing localStorage:', error);
      return initialValue;
    }
  });

  useEffect(() => {
    // İstemci tarafında localStorage'a değeri kaydet
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(key, storedValue);
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
    }
  }, [key, storedValue]);

  const setValue = (value: string) => {
    try {
      setStoredValue(value);
    } catch (error) {
      console.error('Error setting value:', error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;