import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

type ModalContextValue = {
  isCreateListOpen: boolean;
  openCreateList: () => void;
  closeCreateList: () => void;
};

const ModalContext = createContext<ModalContextValue | undefined>(undefined);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isCreateListOpen, setCreateListOpen] = useState(false);

  const openCreateList = useCallback(() => setCreateListOpen(true), []);
  const closeCreateList = useCallback(() => setCreateListOpen(false), []);

  const value = useMemo(() => ({ isCreateListOpen, openCreateList, closeCreateList }), [isCreateListOpen, openCreateList, closeCreateList]);

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('useModal must be used inside ModalProvider');
  return ctx;
}