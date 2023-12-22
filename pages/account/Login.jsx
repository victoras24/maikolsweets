import { useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../data/firebase"
import { FacebookLogin } from "./FacebookLogin"
import { GoogleLogin } from "./GoogleLogin"
import { Alert } from "react-bootstrap"
import { toast } from "sonner"

export default function Login() {
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    })

    const onLogin = (e) => {
        e.preventDefault()
        signInWithEmailAndPassword(auth, inputs.email, inputs.password)
            .then((userCredential) => {
                const user = userCredential.user
                navigate("/")
                console.log(user)
                toast.success(`${user.email.split('@')[0]} has logged in`)
            })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
                setError(errorMessage)
                console.log(errorCode, errorMessage)
                toast.error("Please try again")
            })
    }

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
                {error && <Alert className="register-alert" variant="danger"><i className="fa-solid fa-circle-exclamation"></i> {error.replace("Firebase:", "")}</Alert>}
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
                    <button onClick={onLogin}>Login</button>
                </form>
            </div>
            <p>or</p>
            <FacebookLogin />
            <GoogleLogin />
        </div>
    )
}