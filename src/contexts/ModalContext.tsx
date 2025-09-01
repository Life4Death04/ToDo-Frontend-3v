// Imports: React for JSX/types and hooks used to build the context implementation.
import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

// Define the shape of the value that the ModalContext will provide to consumers.
// Keeping this typed helps TS users know what functions/properties are available.
type ModalContextValue = {
  // boolean state: true when the "create list" modal is open
  isCreateListOpen: boolean;
  // function to open the create-list modal
  openCreateList: () => void;
  // function to close the create-list modal
  closeCreateList: () => void;
};

// Create the context. The initial value is `undefined` so we can detect
// incorrect usage (calling the hook outside a provider) and throw a helpful
// error instead of silently failing.
const ModalContext = createContext<ModalContextValue | undefined>(undefined);

// Provider component that wraps parts of the app which need to open/close the
// create-list modal. It exposes state and helper functions via context.
export function ModalProvider({ children }: { children: React.ReactNode }) {
  // Local state tracking whether the create-list popup is open.
  // Default false -> modal closed.
  const [isCreateListOpen, setCreateListOpen] = useState(false);

  // Stable callback to open the modal. useCallback keeps the function identity
  // stable across renders which is useful when passing it down to memoized
  // components or into dependency arrays.
  const openCreateList = useCallback(() => setCreateListOpen(true), []);

  // Stable callback to close the modal.
  const closeCreateList = useCallback(() => setCreateListOpen(false), []);

  // Memoize the context value object so consumers don't re-render unless one
  // of the actual values changes. This prevents passing a new object each
  // render which would cause unnecessary updates.
  const value = useMemo(
    () => ({ isCreateListOpen, openCreateList, closeCreateList }),
    [isCreateListOpen, openCreateList, closeCreateList]
  );

  // Provide the value to children.
  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}

// Custom hook to consume the ModalContext. It throws a helpful error when
// used outside the provider, making debugging easier than returning undefined.
export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('useModal must be used inside ModalProvider');
  return ctx;
}