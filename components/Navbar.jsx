import React, { useEffect, useState } from "react"
import { NavLink, useLocation } from "react-router-dom"

export default function Navbar() {
    const [show, setShow] = useState(false)
    const location = useLocation()

    useEffect(() => {
        setShow(false)
    }, [location.pathname])

    const toggleNav = () => {
        setShow((prevState) => !prevState)
    }

    const navStyle = {
        height: "100%",
        width: "100%",
        position: "fixed",
        zIndex: "1",
        left: show ? "0" : "-1500px",
        top: "0",
        backgroundColor: "rgba(255, 216, 61, 0.97)",
        overflowX: "hidden",
        transition: "left 0.5s linear"
    }

    const activeStyles = {
        textDecoration: "underline",
        color: "#F6F1E9"
    }

    return (
        <div>

            <div id="nav-icon4" className={show ? "open" : ""} onClick={toggleNav}>
                <span></span>
                <span></span>
                <span></span>
            </div>


            <div className="overlay" style={navStyle}>
                <div className="overlay-content">

                    <NavLink
                        to="products"
                        className="nav-item"
                        style={({ isActive }) => isActive ? activeStyles : null}
                    >Our Products
                    </NavLink>

                    <NavLink
                        className="nav-item"
                        to="productscat"
                        style={({ isActive }) => isActive ? activeStyles : null}
                    >Special Moments
                    </NavLink>

                    <NavLink
                        className="nav-item"
                        to="about"
                        style={({ isActive }) => isActive ? activeStyles : null}
                    >About us
                    </NavLink>

                    <NavLink
                        className="nav-item"
                        to="account"
                        style={({ isActive }) => isActive ? activeStyles : null}
                    >My account
                    </NavLink>

                </div>
            </div>

        </div>
    )
}
