import css from './Modal.module.css';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  closeModal: () => void;
  children: React.ReactNode;
}

export default function Modal({ closeModal, children }: ModalProps) {
  const element = document.createElement('div');

  useEffect(() => {
    document.body.appendChild(element);
    document.body.style.overflow = 'hidden';

    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };
    document.addEventListener('keydown', onEsc);

    return () => {
      document.body.removeChild(element);
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onEsc);
    };
  }, [element, closeModal]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return createPortal(
    <div
      className={css.backdrop}
      role='dialog'
      aria-modal='true'
      onClick={handleBackdropClick}
    >
      <div className={css.modal}>{children}</div>
    </div>,
    element
  );
}
