import { useState } from "react"
import { NavLink } from "react-router-dom";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import logoImage from "../assets/site-logo.png"
import Navbar from "./Navbar";
import Cart from "./Cart";
import { useAuth } from "./AuthProvider";

export default function Header() {

    const { user } = useAuth()
    const [visible, setVisible] = useState(false)
    const { scrollY } = useScroll()

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
            <Navbar />
            <NavLink to="/"><img className="logo-img" src={logoImage} alt="logo image" /></NavLink>
            <div className="header-account-header-container">
                {user ? (
                    <NavLink to="/dashboard">
                        {user.profilePicURL === "" ? (
                            <i className="fa-solid fa-user-astronaut"></i>
                        ) : (
                            <img className="user-photo" src={user.profilePicURL} alt="" />
                        )}
                    </NavLink>
                ) : (
                    <NavLink to="/login">
                        <i className="fa-solid fa-user-astronaut"></i>
                    </NavLink>
                )}
                <Cart />
            </div>
        </motion.header>
    )
} 