import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom";
import logoImage from "../assets/logo.png"
import Navbar from "./Navbar";

export default function Header() {

    const [scroll, setScroll] = useState(0);
    const [visible, setVisible] = useState(true);


    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY;

            setVisible(currentScrollPos < scroll || currentScrollPos < 100);

            setScroll(currentScrollPos);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scroll]);

    return (
        <header className={`header ${visible ? 'visible' : 'hidden'}`}>
            <Navbar />
            <NavLink to="/"><img className="logo-img" src={logoImage} alt="logo image" /></NavLink>
            <i className="fa fa-thin fa-cart-shopping"></i>
        </header>
    )
} 