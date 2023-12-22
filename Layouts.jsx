import React from "react"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import Products from "./pages/products/Products"
import ProductDetail from "./pages/products/ProductDetail"
import About from "./pages/About"
import Login from "./pages/account/Login"
import Register from "./pages/account/Register"
import Contact from "./pages/Contact"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { CartProvider } from "./components/CartProvider"
import { LoginProvider } from "./pages/account/LoginProvider"
import { Toaster } from "sonner"

export default function Layouts() {
    return (
        <BrowserRouter>
            <Toaster richColors position="bottom-center" />
            <LoginProvider>
                <CartProvider>
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route index element={<Home />} />
                            <Route path="products" element={<Products />} />
                            <Route path="products/:id" element={<ProductDetail />} />
                            <Route path="about" element={<About />} />
                            <Route path="login" element={<Login />} />
                            <Route path="register" element={<Register />} />
                            <Route path="contact" element={<Contact />} />
                        </Route>
                    </Routes>
                </CartProvider>
            </LoginProvider>
        </BrowserRouter>
    )
}

