import React, { useState } from 'react';
import ToastContext from './Toast';
import { motion, AnimatePresence } from 'framer-motion';

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
            <AnimatePresence>
                <motion.div
                    key="error-toast"
                    className="toast-error"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{
                        duration: 0.3,
                        ease: [0, 0.71, 0.2, 1.01],
                        scale: {
                            type: 'spring',
                            damping: 5,
                            stiffness: 100,
                            restDelta: 0.001,
                        },
                    }}
                >
                    <i className="fa-solid fa-circle-exclamation" />
                    <p>Username already exists</p>
                </motion.div>
            </AnimatePresence>
        )
    }

    const firebaseError = (err) => {
        open(
            <AnimatePresence>
                <motion.div
                    key="error-toast"
                    className="toast-error"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{
                        duration: 0.3,
                        ease: [0, 0.71, 0.2, 1.01],
                        scale: {
                            type: 'spring',
                            damping: 5,
                            stiffness: 100,
                            restDelta: 0.001,
                        },
                    }}
                >
                    <i className="fa-solid fa-circle-exclamation" />
                    <p>{err}</p>
                </motion.div>
            </AnimatePresence>
        )
    }

    const close = (id) => {
        setToasts((toasts) => toasts.filter((toast) => toast.id !== id))
    }

    return (
        <ToastContext.Provider value={{ open, close, openUsernameExistsError, firebaseError }}>
            {children}
            <div className="toast-container">
                {toasts.map(({ id, component }) => (
                    <div key={id} className="toast">
                        {/* <button className="toast-close-button" onClick={() => close(id)}>
                            x
                        </button> */}
                        {component}
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    )
}

export { ToastProvider }