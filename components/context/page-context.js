import { createContext, useState } from "react";

export const PageContext = createContext({
  currentPage: [],
  updatePage: () => {},
});

export const PageContextProvider = (props) => {
  const [currentPage, setCurrentPage] = useState([]);

  const updateHandler = (param1, param2) => {
    setCurrentPage([param1, param2]);
  };

  return (
    <PageContext.Provider
      value={{
        currentPage: currentPage,
        updatePage: updateHandler,
      }}
    >
      {props.children}
    </PageContext.Provider>
  );
};

export default PageContext;
