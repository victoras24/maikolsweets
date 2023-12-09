import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap"
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../data/firebase';
import { GoogleLogin } from "./GoogleLogin"
import { FacebookLogin } from "./FacebookLogin";
import AccountSignOut from "./AccountSignOut";
import { useLogin } from "./LoginProvider";


export default function Register() {
    const { login } = useLogin()
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const authCreateAccountWithEmail = async (e) => {
        e.preventDefault()
        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user
                login()
                console.log(user)
                navigate("/")
            })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
                setError(error.message)
                console.log(errorCode, errorMessage)
            })
    }

    return (
        <div className="account-register-container">
            <h1>
                Create an account
            </h1>
            {error && <Alert className="register-alert" variant="danger"><i class="fa-solid fa-circle-exclamation"></i> {error.replace("Firebase:", "")}</Alert>}
            <form onSubmit={authCreateAccountWithEmail} className="login-form">
                <input
                    name="email"
                    type="email"
                    placeholder="Email address"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <button
                    type="submit"
                    onClick={authCreateAccountWithEmail}
                >Register</button>
            </form>
            <p>or</p>
            <FacebookLogin />
            <GoogleLogin />
            <AccountSignOut />
        </div>
    )
}