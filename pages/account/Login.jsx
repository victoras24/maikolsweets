import { useState } from "react"
import { Link } from "react-router-dom"

export default function Login() {
    const [loginData, setLoginData] = useState({ email: "", password: "" })

    const formSubmit = (e) => {
        e.preventDefault()
        console.log(loginData)
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setLoginData(prev => ({
            ...prev,
            [name]: value
        }))
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
                <form className="login-form" onSubmit={formSubmit}>
                    <input
                        name="email"
                        onChange={handleChange}
                        type="email"
                        placeholder="Email address"
                        value={loginData.email}
                    />
                    <input
                        name="password"
                        onChange={handleChange}
                        type="password"
                        placeholder="Password"
                        value={loginData.password}
                    />
                    <button>Login</button>
                </form>
            </div>
        </div>
    )
}