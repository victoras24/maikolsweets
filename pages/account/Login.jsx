import { useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../data/firebase"

export default function Login() {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onLogin = (e) => {
        e.preventDefault()
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user
                navigate("/")
                console.log(user)
            })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
                console.log(errorCode, errorMessage)
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
                <form className="login-form">
                    <input
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="Email address"
                        value={email}
                    />
                    <input
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Password"
                        value={password}
                    />
                    <button onClick={onLogin}>Login</button>
                </form>
            </div>
        </div>
    )
}