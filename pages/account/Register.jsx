import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap"
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../data/firebase';
import { GoogleLogin } from "./GoogleLogin"
import { FacebookLogin } from "./FacebookLogin";
import AccountSignOut from "./AccountSignOut";
import { useLogin } from "./LoginProvider";


export default function Register() {
    const { login, logout, isLoggedIn } = useLogin()
    const navigate = useNavigate()
    const [inputs, setInputs] = useState({
        username: "",
        fullName: "",
        email: "",
        password: ""
    })
    const [error, setError] = useState('')

    const authCreateAccountWithEmail = async (e) => {
        e.preventDefault()
        await createUserWithEmailAndPassword(auth, inputs.email, inputs.password)
            .then((userCredential) => {
                const user = userCredential.user
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

    onAuthStateChanged(auth, (user) => {
        if (user) {
            login()
            console.log(isLoggedIn)
        } else {
            logout()
            console.log(isLoggedIn)
        }
    })

    return (
        <div className="account-register-container">
            <h1>
                Create an account
            </h1>
            {error && <Alert className="register-alert" variant="danger"><i class="fa-solid fa-circle-exclamation"></i> {error.replace("Firebase:", "")}</Alert>}
            <form onSubmit={authCreateAccountWithEmail} className="login-form">
                <input
                    name="Username"
                    type="text"
                    placeholder="Username"
                    onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                    value={inputs.username}
                />
                <input
                    name="Full Name"
                    type="text"
                    placeholder="Full Name"
                    onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
                    value={inputs.fullName}
                />
                <input
                    name="Email"
                    type="email"
                    placeholder="Email Address"
                    onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                    value={inputs.email}
                />
                <input
                    name="Password"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                    value={inputs.password}
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