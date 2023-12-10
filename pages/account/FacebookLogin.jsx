import { getRedirectResult } from "firebase/auth";
import { useEffect } from "react";
import { auth, signInWithFacebookRedirect } from "../../data/firebase";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export function FacebookLogin() {
    const location = useLocation()
    const navigate = useNavigate()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getRedirectResult(auth)
                console.log(response)
            } catch (error) {
                console.error("Error during Facebook login:", error)
            }
        }
        fetchData()
    }, [navigate])

    return (
        <div onClick={signInWithFacebookRedirect} className="facebook-login-container">
            <button className="facebook-login-button">
                {location.pathname === "/register" ? "Register with Facebook" : "Login with Facebook"}
            </button>
            <i className="fa fa-brands fa-facebook"></i>
        </div>
    );
}
