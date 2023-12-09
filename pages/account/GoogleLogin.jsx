import { getRedirectResult } from "firebase/auth";
import { useEffect } from "react";
import { auth, signInWithGoogleRedirect } from "../../data/firebase";

export function GoogleLogin() {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getRedirectResult(auth)
                console.log(response)
            } catch (error) {
                console.error("Error during Google login:", error)
            }
        }
        fetchData()
    }, [])

    return (
        <div onClick={signInWithGoogleRedirect} className="google-login-container">
            <button className="google-login-button">
                Login with Google
            </button>
            <i className="fa fa-brands fa-google"></i>
        </div>
    );
}
