import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "./CartProvider";

export default function Cart() {
    const cartRef = useRef(null)
    const { cartItems, removeFromCart, openCart, toggleCart, setOpenCart } = useCart()

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (cartRef.current && !cartRef.current.contains(e.target)) {
                setOpenCart(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [setOpenCart])

    const containerVariants = {
        hidden: { x: "-100%", opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { duration: 0.2, ease: "easeInOut" } },
    }

    const motionText = {
        initial: { x: "-100%", opacity: 0, transition: { duration: 0.2, ease: [0.37, 0, 0.63, 1] } },
        open: { x: 0, opacity: 1, transition: { duration: 0.2, ease: [0, 0.55, 0.45, 1] } },
    }

    const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)

    return (
        <div>
            <i className="fa-brands fa-opencart fa-bag-shopping" onClick={toggleCart} />
            {cartItems.length > 0 && <span className="badge-cart" onClick={toggleCart}>{cartItems.length}</span>}
            <AnimatePresence>
                {openCart && (
                    <div className="cart-backdrop">
                        <motion.div
                            className="cart-container"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                        >
                            <motion.div
                                ref={cartRef}
                                className="cart-content"
                                variants={motionText}
                                initial="initial"
                                animate="open"
                            >
                                <div className="cart-header">
                                    <p>SHOPPING CART</p>
                                    <i className="fa fa-xmark" onClick={toggleCart}></i>
                                </div>
                                <div className="cart-items">
                                    {cartItems.length === 0 ? (
                                        <div className="cart-empty">
                                            <i className="fa-brands fa-opencart fa-bag-shopping" />
                                            <p>The cart is empty</p>
                                        </div>
                                    ) : (
                                        <ul>
                                            {cartItems.map((item) => (
                                                <li key={item.id}>
                                                    <div className="cart-item-container">
                                                        <img className="cart-item-image" src={item.image} alt={item.name} />
                                                        <div className="cart-item-name-price">
                                                            <p className="cart-item-name">
                                                                {item.name} {item.quantity > 1 && `x${item.quantity}`}
                                                            </p>
                                                            <p className="cart-item-price">€{item.price.toFixed(2)} / piece</p>
                                                        </div>
                                                        <i className="fa fa-thin fa-trash-can" onClick={() => removeFromCart(item.id)} />
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                                {cartItems.length > 0 && (
                                    <div className="cart-total">
                                        <p>Total: €{totalPrice.toFixed(2)}</p>
                                    </div>
                                )}
                            </motion.div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}