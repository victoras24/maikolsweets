import { useState } from "react";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../data/firebase';
import { GoogleLogin } from "./GoogleLogin"
import { FacebookLogin } from "./FacebookLogin";
import { useLogin } from "./LoginProvider";
import useSignUpWithEmailAndPassword from "../../hooks/useSignUpWithEmailAndPassword"
import useLogout from "../../hooks/useLogout"
import { toast } from "sonner"

export default function Register() {
    const { login, logout, isLoggedIn } = useLogin()
    const { handleLogout } = useLogout()
    const [inputs, setInputs] = useState({
        username: "",
        fullName: "",
        email: "",
        password: ""
    })

    const { signup, error } = useSignUpWithEmailAndPassword()

    const handleRegister = async () => {
        if (!inputs.email || !inputs.password || !inputs.username || !inputs.fullName) {
            toast.error('Please fill in all fields')
            return
        }

        try {
            await signup(inputs)

            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    await login()
                    console.log(isLoggedIn)
                    toast.success("Logged in")
                } else {
                    await logout()
                    console.log(isLoggedIn)
                    toast.success("Logged out")
                }
            })
        } catch (error) {
            toast.error("Registration failed. Please try again.")
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
            <button onClick={() => handleLogout()}>
                logout
            </button>
        </div>
    )
}
