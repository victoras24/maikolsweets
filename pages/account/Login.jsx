import { useState } from "react"
import { Link } from "react-router-dom"
// import { FacebookLogin } from "./FacebookLogin"
// import { GoogleLogin } from "./GoogleLogin"
import { Alert } from "react-bootstrap"
import { useLogin } from "../../hooks/useLogin"
import { useLoginWithGoogle } from "../../hooks/useLoginWithGoogle"
import { useLoginWithFacebook } from "../../hooks/useLoginWithFacebook"

export default function Login() {
    const { facebookLogin } = useLoginWithFacebook()
    const { googleLogin } = useLoginWithGoogle()
    const { login, error } = useLogin()
    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    })

    return (
        <div className="account-container">
            <h1>ALREADY REGISTERED?</h1>
            <div className="account-new-client-container">
                <p>By registering an account with our store, you'll enjoy a streamlined checkout experience,
                    the convenience of storing multiple shipping addresses, easy order tracking, and more.
                </p>
                <Link to="/register">
                    <button>
                        CREATE AN ACCOUNT
                    </button>
                </Link>
            </div>
            <div className="account-login-container">
                <h3>LOGIN</h3>
                <p>If you have an account please login.</p>
                {error && <Alert className="register-alert" variant="danger"><i className="fa-solid fa-circle-exclamation"></i> {error.message.replace("Firebase:", "")}</Alert>}
                <form className="login-form">
                    <input
                        name="email"
                        onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                        type="email"
                        placeholder="Email address"
                        value={inputs.email}
                    />
                    <input
                        name="password"
                        onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                        type="password"
                        placeholder="Password"
                        value={inputs.password}
                    />
                    <button onClick={(e) => {
                        e.preventDefault()
                        login(inputs)
                    }}>Login</button>
                </form>
            </div>
            <p>or</p>
            <div onClick={facebookLogin} className="facebook-login-container">
                <button className="facebook-login-button">
                    {location.pathname === "/register" ? "Register with Facebook" : "Login with Facebook"}
                </button>
                <i className="fa fa-brands fa-facebook"></i>
            </div>
            <div onClick={googleLogin} className="google-login-container">
                <button className="google-login-button">
                    {location.pathname === "/register" ? "Register with Google" : "Login with Google"}
                </button>
                <i className="fa-brands fa-google"></i>
            </div>

            {/* <FacebookLogin />
            <GoogleLogin /> */}
        </div>
    )
}