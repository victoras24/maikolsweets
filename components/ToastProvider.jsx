import React, { useState } from 'react';
import ToastContext from './Toast';
import { motion } from 'framer-motion';

const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([])

    const open = (component, timeout = 5000) => {
        const id = Date.now()
        setToasts((toasts) => [...toasts, { id, component }])
        setTimeout(() => close(id), timeout)
        return id
    }

    const openUsernameExistsError = () => {
        open(
            <div className="toast-error">
                <i className="fa-solid fa-circle-exclamation" />
                <p>Username already exists</p>
            </div>
        )
    }

    const close = (id) => {
        setToasts((toasts) => toasts.filter((toast) => toast.id !== id))
    }

    return (
        <ToastContext.Provider value={{ open, close, openUsernameExistsError }}>
            {children}
            <div className="toast-container">
                {toasts.map(({ id, component }) => (
                    <div key={id} className="toast">
                        <button className="toast-close-button" onClick={() => close(id)}>
                            x
                        </button>
                        {component}
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    )
}

export { ToastProvider }