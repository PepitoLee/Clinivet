import React, { createContext, useContext, useState, ReactNode } from 'react';

type ModalType = 'appointment' | 'product' | null;

interface ModalContextType {
  isOpen: boolean;
  modalType: ModalType;
  modalData: any;
  openModal: (type: ModalType, data?: any) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(null);
  const [modalData, setModalData] = useState<any>(null);

  const openModal = (type: ModalType, data?: any) => {
    setModalType(type);
    setModalData(data);
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalType(null);
    setModalData(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <ModalContext.Provider
      value={{ isOpen, modalType, modalData, openModal, closeModal }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}
