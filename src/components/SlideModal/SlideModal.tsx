import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

type SlideModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  side?: 'right' | 'left';
  widthClass?: string; // e.g. "max-w-md"
  closeOnOverlayClick?: boolean;
};

const TRANSITION_MS = 300;

export function SlideModal({
  isOpen,
  onClose,
  children,
  side = 'right',
  widthClass = 'max-w-md',
  closeOnOverlayClick = true
}: SlideModalProps) {
  const [mounted, setMounted] = useState(isOpen);
  const [visible, setVisible] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      // small tick so transition classes apply
      requestAnimationFrame(() => setVisible(true));
      // lock scroll
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    } else if (mounted) {
      // start exit animation
      setVisible(false);
      const t = setTimeout(() => setMounted(false), TRANSITION_MS);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  useEffect(() => {
    if (mounted) {
      // focus panel for accessibility
      panelRef.current?.focus();
    }
  }, [mounted]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (mounted) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mounted, onClose]);

  if (!mounted) return null;

  const overlayOpacity = visible ? 'opacity-100' : 'opacity-0';
  const panelTranslate =
    side === 'right'
      ? visible ? 'translate-x-0' : 'translate-x-full'
      : visible ? 'translate-x-0' : '-translate-x-full';
  const sidePosition = side === 'right' ? 'right-0' : 'left-0';

  const overlayClick = (e: React.MouseEvent) => {
    if (!closeOnOverlayClick) return;
    if (e.target === e.currentTarget) onClose();
  };

  return createPortal(
    <div
      className={`fixed inset-0 z-50 flex ${side === 'left' ? 'justify-start' : 'justify-end'} items-stretch`}
      onMouseDown={overlayClick}
      aria-hidden={false}
    >
      {/* backdrop */}
      <div
        className={`absolute inset-0 bg-black/45 backdrop-blur-sm transition-opacity duration-${TRANSITION_MS} ${overlayOpacity}`}
        aria-hidden
      />
      {/* sliding panel */}
      <div
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        ref={panelRef}
        className={`relative h-full ${sidePosition} ${widthClass} bg-white dark:bg-gray-900 shadow-2xl transform ${panelTranslate} transition-transform duration-${TRANSITION_MS} ease-in-out focus:outline-none`}
      >
        {/* close button (optional) */}
        <div className="p-4 flex justify-end">
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="p-6 overflow-auto h-[calc(100%-64px)]">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}