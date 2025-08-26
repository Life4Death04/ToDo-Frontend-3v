import React, { createContext, useContext, useCallback, useState } from 'react';
import { ErrorModal } from '../components/ErrorModal/ErrorModal';

type ErrorState = {
  visible: boolean;
  title?: string;
  message?: string;
}

type ErrorModalContextValue = {
  showError: (payload: { title?: string; message?: string }) => void;
  hideError: () => void;
  state: ErrorState;
}

const ErrorModalContext = createContext<ErrorModalContextValue | undefined>(undefined);

export const ErrorModalProvider = ({ children }:{ children: React.ReactNode }) => {
  const [state, setState] = useState<ErrorState>({ visible: false });

  const showError = useCallback(({ title, message }: { title?: string; message?: string }) => {
    setState({ visible: true, title, message });
  }, []);

  const hideError = useCallback(() => setState({ visible: false }), []);

  return (
    <ErrorModalContext.Provider value={{ showError, hideError, state }}>
      {children}
      {state.visible && <ErrorModal errorType={state.title} errorMessage={state.message} />}
    </ErrorModalContext.Provider>
  );
}

export function useErrorModal(){
  const ctx = useContext(ErrorModalContext);
  if(!ctx) throw new Error('useErrorModal must be used inside ErrorModalProvider');
  return ctx;
}

export default ErrorModalContext;
