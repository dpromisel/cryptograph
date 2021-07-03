import React, { createContext, useState } from "react";

type ContextProps = {
  children: React.ReactNode;
};

export interface IHistoryContext {
  url: string;
}

type ContextType = {
  history: string[];
  appendItem: (item: string) => void;
};

export const HistoryContext = createContext<ContextType>(null);

const HistoryProvider = ({ children }: ContextProps) => {
  const [history, setHistory] = useState<string[]>([]);

  const appendItem = (item: string) => {
    if (item !== history[0]) setHistory([item, ...history]);
  };

  return (
    <HistoryContext.Provider
      value={{
        history,
        appendItem,
      }}
    >
      {" "}
      {children}{" "}
    </HistoryContext.Provider>
  );
};

export default HistoryProvider;
