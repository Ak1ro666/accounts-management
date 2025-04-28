import { createContext, useContext } from "react";

export function createStrictContext<T>() {
  const context = createContext<T | null>(null);

  function Provider({
    value,
    children,
  }: {
    value: T;
    children: React.ReactNode;
  }) {
    return <context.Provider value={value}>{children}</context.Provider>;
  }

  const useStrictContext = () => {
    const contextValue = useContext(context);

    if (contextValue === null) {
      throw new Error("No context value found");
    }

    return contextValue;
  };

  return { use: useStrictContext, Provider } as const;
}

export function createHookContext<T>(hook: () => T) {
  const strictContext = createStrictContext<T>();

  function Provider({ children }: { children: React.ReactNode }) {
    const value = hook();

    return (
      <strictContext.Provider value={value}>{children}</strictContext.Provider>
    );
  }

  return { use: strictContext.use, Provider } as const;
}
