import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ButtonIcon } from './CommonComponents';

type FullScreenModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  className?: string;
  closeOnOverlayClick?: boolean;
};

export default function FullScreenModal({ isOpen, onClose, title, children, className, closeOnOverlayClick = true }: FullScreenModalProps){
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    // focus panel for accessibility
    requestAnimationFrame(() => panelRef.current?.focus());

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex justify-center p-4">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onMouseDown={(e) => { if (closeOnOverlayClick && e.target === e.currentTarget) onClose(); }}
      />

      {/* panel */}
      <div
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        ref={panelRef}
        className={`relative z-10 w-fit h-full max-w-4xl bg-white dark:bg-background-dark rounded-lg shadow-2xl overflow-auto ${className ?? ''}`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-bold dark:text-text-dark-white">{title}</h2>
          <ButtonIcon iconStyle="fa-solid fa-x" onClick={onClose} />
        </div>
        <div className="md:px-4 flex justify-center">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}
