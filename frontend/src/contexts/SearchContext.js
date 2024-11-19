import React, { createContext, useState, useContext } from "react";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [productQuery, setProductQuery] = useState("");

  return (
    <SearchContext.Provider value={{ productQuery, setProductQuery }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  return useContext(SearchContext);
};
