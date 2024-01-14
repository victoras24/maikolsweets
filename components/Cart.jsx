import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "./CartProvider";
import { useEffect, useRef } from "react";

export default function Cart() {
    const cartRef = useRef(null)
    const { cartItems, removeFromCart, openCart, toggle, setOpenCart } = useCart()

    useEffect(() => {
        const handleClickingOutsideCartContainer = (e) => {
            if (cartRef.current && !cartRef.current.contains(e.target)) {
                setOpenCart(false)
            }
        }

        document.addEventListener("mousedown", handleClickingOutsideCartContainer)

        return () => {
            document.removeEventListener("mousedown", handleClickingOutsideCartContainer)
        }
    }, [cartRef, setOpenCart])

    const containerVariants = {
        hidden: { x: "-100%", opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { duration: 0.2, ease: "easeInOut" } },
    }

    const motionText = {
        initial: {
            x: "-100%",
            opacity: 0,
            transition: {
                duration: 0.2,
                ease: [0.37, 0, 0.63, 1],
            },
        },
        open: {
            x: 0,
            opacity: 1,
            transition: {
                duration: 0.2,
                ease: [0, 0.55, 0.45, 1],
            },
        },
    }

    return (
        <div>
            <i className="fa-brands fa-opencart fa-bag-shopping" onClick={toggle} />
            {cartItems.length === 0 ? null : <span className="badge-cart" onClick={toggle}>{cartItems.length}</span>}
            <AnimatePresence>
                {openCart && (
                    <div className="cart-backdrop" >
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
                                    <i className="fa fa-xmark" onClick={toggle}></i>
                                </div>
                                <div className="cart-items">
                                    <ul>
                                        {cartItems.length === 0 ? (
                                            <div className="cart-empty">
                                                <i className="fa-brands fa-opencart fa-bag-shopping" />
                                                <p>The cart is empty</p>
                                            </div>
                                        ) : (
                                            cartItems.map((item, index) => (
                                                <li
                                                    key={index}
                                                >
                                                    <div className="cart-item-container">
                                                        <img className="cart-item-image" src={item.image} />
                                                        <div className="cart-item-name-price">
                                                            <p className="cart-item-name">
                                                                {item.name}{" "}
                                                                {item.quantity > 1 && `x${item.quantity}`}
                                                            </p>
                                                            <p className="cart-item-price">€{item.price}</p>
                                                        </div>
                                                        <i className="fa fa-thin fa-trash-can" onClick={() => removeFromCart(item.id)} />
                                                    </div>
                                                </li>
                                            ))
                                        )}
                                    </ul>
                                </div>
                                {cartItems.length > 0 && (
                                    <div className="cart-total">
                                        <p>Total: €{cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}</p>
                                    </div>
                                )}

                            </motion.div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div >
    )
}
