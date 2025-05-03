import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';

type CollapsedContextType = {
  collapsed: boolean;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
};

const CollapsedContext = createContext<CollapsedContextType | undefined>(
  undefined
);

export const CollapsedProvider = ({ children }: { children: ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <CollapsedContext.Provider value={{ collapsed, setCollapsed }}>
      {children}
    </CollapsedContext.Provider>
  );
};

export const useCollapsedContext = () => {
  const context = useContext(CollapsedContext);
  if (!context) {
    throw new Error('useCollapsedContext need use into CollapsedProvider');
  }
  return context;
};
