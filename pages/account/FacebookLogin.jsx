import { signInWithFacebookPopup } from "../../data/firebase"

export const FacebookLogin = () => {
    const logFacebookUser = async () => {
        const res = await signInWithFacebookPopup()
        console.log(res)
    }
    return (
        <div onClick={logFacebookUser} className="facebook-login-container">
            <button className="facebook-login-button">
                Login with Facebook
            </button>
            <i class="fa fa-brands fa-facebook"></i>
        </div>
    )
}