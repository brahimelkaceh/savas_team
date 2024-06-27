import { useState } from "react";
const UseLocalStorageState = (key, initialValue) => {
  const storedValue = localStorage.getItem(key);

  const initial = storedValue ? JSON.parse(storedValue) : initialValue;

  const [value, setValue] = useState(initial);

  const setStoredValue = (newValue) => {
    localStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  };

  return [value, setStoredValue];
};

export default UseLocalStorageState;
