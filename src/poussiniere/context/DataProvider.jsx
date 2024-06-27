import React, { createContext, useContext, useReducer } from "react";

// Create a context
const DataContext = createContext();

// Reducer function to handle data state
const dataReducer = (state, action) => {
  switch (action.type) {
    case "SET_DATA":
      return action.payload;
    default:
      return state;
  }
};

// DataProvider component to provide data and dispatch function to its children
export const DataProvider = ({ children }) => {
  const [data, dispatch] = useReducer(dataReducer, null);

  return (
    <DataContext.Provider value={{ data, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};

// Custom hook to consume the data and dispatch function
export const useData = () => {
  return useContext(DataContext);
};
