import React from "react"
import ReactDOM from "react-dom/client"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import Products from "./pages/products/Products"
import ProductDetail from "./pages/products/ProductDetail"
import About from "./pages/About"
import Account from "./pages/Account"
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="products" element={<Products />} />
                    <Route path="products/:id" element={<ProductDetail />} />
                    <Route path="about" element={<About />} />
                    <Route path="account" element={<Account />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

ReactDOM
    .createRoot(document.getElementById('root'))
    .render(<App />)