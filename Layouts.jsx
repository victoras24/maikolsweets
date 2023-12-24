import React from "react"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import Products from "./pages/products/Products"
import ProductDetail from "./pages/products/ProductDetail"
import About from "./pages/About"
import Login from "./pages/account/Login"
import Register from "./pages/account/Register"
import Contact from "./pages/Contact"
import Dashboard from "./pages/account/Dashboard"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { CartProvider } from "./components/CartProvider"
import { LoginProvider } from "./pages/account/LoginProvider"
import { Toaster } from "sonner"
import { AuthProvider } from "./components/AuthProvider"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "./data/firebase"

export default function Layouts() {

    const [authUser] = useAuthState(auth)

    return (
        <BrowserRouter>
            <Toaster richColors position="bottom-center" />
            <AuthProvider>
                <LoginProvider>
                    <CartProvider>
                        <Routes>
                            <Route path="/" element={<Layout />}>
                                <Route index element={<Home />} />
                                <Route path="products" element={<Products />} />
                                <Route path="products/:id" element={<ProductDetail />} />
                                <Route path="about" element={<About />} />
                                <Route path="login" element={authUser ? <Dashboard /> : <Login />} />
                                <Route path="register" element={authUser ? <Dashboard /> : <Register />} />
                                <Route path="contact" element={<Contact />} />
                                <Route path="dashboard" element={<Dashboard />} />
                            </Route>
                        </Routes>
                    </CartProvider>
                </LoginProvider>
            </AuthProvider>
        </BrowserRouter>
    )
}

