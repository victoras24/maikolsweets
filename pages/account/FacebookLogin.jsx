import { getRedirectResult } from "firebase/auth";
import { useEffect } from "react";
import { auth, signInWithFacebookRedirect } from "../../data/firebase";

export function FacebookLogin() {
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
    }, [])

    return (
        <div onClick={signInWithFacebookRedirect} onTouchStart={signInWithFacebookRedirectcd} className="facebook-login-container">
            <button className="facebook-login-button">
                Login with Facebook
            </button>
            <i className="fa fa-brands fa-facebook"></i>
        </div>
    );
}
