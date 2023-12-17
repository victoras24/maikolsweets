import { useState } from "react";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../data/firebase';
import { GoogleLogin } from "./GoogleLogin"
import { FacebookLogin } from "./FacebookLogin";
import AccountSignOut from "./AccountSignOut";
import { useLogin } from "./LoginProvider";
import useSignUpWithEmailAndPassword from "../../hooks/useSignUpWithEmailAndPassword"
import { useToast } from "../../components/Toast"

export default function Register() {
    const { login, logout, isLoggedIn } = useLogin()
    const [inputs, setInputs] = useState({
        username: "",
        fullName: "",
        email: "",
        password: ""
    })

    const { signup, error } = useSignUpWithEmailAndPassword()
    const toast = useToast()

    const handleRegister = async () => {
        if (!inputs.email || !inputs.password || !inputs.username || !inputs.fullName) {
            toast.open(
                <div className="toast-error">
                    <i className="fa-solid fa-circle-exclamation" />
                    <p>Please fill all the fields</p>
                </div>
            )
            return
        }

        try {
            await signup(inputs)

            onAuthStateChanged(auth, (user) => {
                if (user) {
                    login()
                    console.log(isLoggedIn)
                } else {
                    logout()
                    console.log(isLoggedIn)
                }
            })
        } catch (error) {
            console.error("Registration failed:", error.message)
        }
    }

    return (
        <div className="account-register-container">
            <h1>Create an account</h1>
            <form className="login-form">
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
                    onClick={(e) => {
                        e.preventDefault()
                        handleRegister()
                    }}
                >Register</button>
            </form>
            <p>or</p>
            <FacebookLogin />
            <GoogleLogin />
            <AccountSignOut />
        </div>
    )
}
