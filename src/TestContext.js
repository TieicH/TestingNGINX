import React from "react";

const TestContext = React.createContext({
  prueba: ""
});

export const Provider = TestContext.Provider;
export const Consumer = TestContext.Consumer;
