import React, { createContext, useState } from "react";

const Context = createContext();

const Provider = (props) => {
  const host = "https://statistics-api-seven.vercel.app";

  return (
    <Context.Provider value={{ host }}>
      {props.children}
    </Context.Provider>
  );
};

export { Context, Provider };
