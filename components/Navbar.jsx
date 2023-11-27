import React, { useEffect, useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { useCart } from "./CartProvider";

export default function Navbar() {
    const { openCart } = useCart()
    const [show, setShow] = useState(false)
    const location = useLocation()

    useEffect(() => {
        setShow(false)
    }, [location.pathname])

    const toggleNav = () => {
        setShow((prevState) => !prevState)
    }

    const navStyle = {
        height: "100vh",
        width: "100%",
        position: "fixed",
        top: "0",
        left: "0",
        backgroundColor: "#FFD93D",
    }

    const menuVariants = {
        hidden: { scaleY: 0, originY: 0 },
        visible: { scaleY: 1, originY: 0 },
    };

    const menuTransitions = {
        duration: 0.5,
        ease: "easeInOut"
    }

    const motionNavLinks = {
        initial: {
            y: "30vh",
            transition: {
                duration: 0.5,
                ease: [0.37, 0, 0.63, 1]
            },
        },
        open: {
            y: 0,
            transition: {
                duration: 0.7,
                ease: [0, 0.55, 0.45, 1]
            },
        },
    }

    const activeStyles = {
        textDecoration: "underline",
        color: "#f1f1f1"
    }

    return (

        <div>

            {
                openCart ? null :
                    <AnimatePresence>
                        <motion.div
                            id="nav-icon4" className={show ? "open" : ""} onClick={toggleNav}
                        >
                            <span></span>
                            <span></span>
                            <span></span>
                        </motion.div>
                    </AnimatePresence>
            }
            <AnimatePresence>
                {show &&
                    <motion.div
                        className="overlay"
                        style={navStyle}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={menuVariants}
                        transition={menuTransitions}
                    >
                        <motion.div
                            className="overlay-content"
                            variants={motionNavLinks}
                            initial="initial"
                            animate="open"
                        >

                            <NavLink
                                to="/"
                                className="nav-item"
                                style={({ isActive }) => isActive ? activeStyles : null}
                            >HOME
                            </NavLink>

                            <NavLink
                                to="products"
                                className="nav-item"
                                style={({ isActive }) => isActive ? activeStyles : null}
                            >OUR PRODUCTS
                            </NavLink>

                            <NavLink
                                className="nav-item"
                                to="about"
                                style={({ isActive }) => isActive ? activeStyles : null}
                            >ABOUT US
                            </NavLink>

                            <NavLink
                                className="nav-item"
                                to="account"
                                style={({ isActive }) => isActive ? activeStyles : null}
                            >MY ACCOUNT
                            </NavLink>

                            <NavLink
                                className="nav-item"
                                to="contact"
                                style={({ isActive }) => isActive ? activeStyles : null}
                            >CONTACT
                            </NavLink>
                        </motion.div>
                    </motion.div>}
            </AnimatePresence>
        </div >
    )
}
