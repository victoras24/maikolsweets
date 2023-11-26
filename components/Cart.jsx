import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "./CartProvider";

export default function Cart({ toggleCart, openCart }) {

    const { cartItems } = useCart()
    const { removeFromCart } = useCart()

    const containerVariants = {
        hidden: { x: "-100%", opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { duration: 0.2, ease: "easeInOut" } },
    };

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
    };

    return (
        <div>
            <i className="fa fa-bag-shopping" onClick={toggleCart} />
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
                                    <ul>
                                        {cartItems.length === 0 ? (
                                            <div className="cart-empty">
                                                <i className="fa fa-bag-shopping" />
                                                <p>The cart is empty</p>
                                            </div>
                                        ) : (
                                            cartItems.map((item, index) => (
                                                <li
                                                    key={index}
                                                >
                                                    {item.name}
                                                    <i className="fa fa-thin fa-trash-can" onClick={() => removeFromCart(item.id)}></i>
                                                </li>
                                            ))
                                        )}
                                    </ul>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div >
    );
}
