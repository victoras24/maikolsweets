import { signInWithGooglePopup } from "../../data/firebase"

export const GoogleLogin = () => {
    const logGoogleUser = async () => {
        const res = await signInWithGooglePopup()
        console.log(res)
    }
    return (
        <div onClick={logGoogleUser} className="google-login-container">
            <button className="google-login-button">
                Login with Google
            </button>
            <i class="fa fa-brands fa-google"></i>
        </div>
    )
}

