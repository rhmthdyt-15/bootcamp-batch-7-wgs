// ModalProvider.js
import React, { createContext, useContext, useState } from 'react'

const ModalContext = createContext()

export const ModalProvider = ({ children }) => {
    const [isModalOpen, setModalOpen] = useState(false)
    const [modalContent, setModalContent] = useState(null)
    const [modalTitle, setModalTitle] = useState('')

    const openModal = (title, content) => {
        setModalTitle(title)
        setModalContent(content)
        setModalOpen(true)
    }

    const closeModal = () => {
        setModalTitle('')
        setModalContent(null)
        setModalOpen(false)
    }

    return (
        <ModalContext.Provider value={{ isModalOpen, openModal, closeModal, modalTitle }}>
            {children}
            {isModalOpen && modalContent && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="fixed inset-0 bg-black opacity-50"></div>
                        <div className="relative bg-white w-96 p-6 rounded-md shadow-md">
                            <h1 className="text-xl font-bold mb-4">{modalTitle}</h1>
                            {modalContent}
                            <div className="mt-4 flex justify-end">
                                <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md" onClick={closeModal}>
                                    Tutup
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </ModalContext.Provider>
    )
}

export const useModal = () => useContext(ModalContext)
