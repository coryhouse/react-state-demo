import { useState } from "react";

export default function useLocalStorage(key, initialValue) {
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that
  // persists the new value to localStorage.
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valToStore);
      window.localStorage.setItem(key, JSON.stringify(valToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}
