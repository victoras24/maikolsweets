import { useState } from "react"
import { NavLink } from "react-router-dom";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import logoImage from "../assets/site-logo.png"
import Navbar from "./Navbar";
import Cart from "./Cart";

export default function Header() {

    const [openCart, setOpenCart] = useState(false)
    const [visible, setVisible] = useState(false)
    const { scrollY } = useScroll()

    const toggleCart = () => {
        setOpenCart((prevState) => !prevState)
    }

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious()
        if (latest > previous && latest > 150) {
            setVisible(true)
        } else {
            setVisible(false)
        }
    })

    return (
        <motion.header
            className="header"
            variants={{
                visible: { y: 0 },
                hidden: { y: "-100%" },
            }}
            animate={visible ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
        >
            <Navbar openCart={openCart} />
            <NavLink to="/"><img className="logo-img" src={logoImage} alt="logo image" /></NavLink>
            <Cart openCart={openCart} toggleCart={toggleCart} />
        </motion.header>
    )
} 