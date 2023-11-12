import React from "react"
import ReactDOM from "react-dom/client"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import Products from "./pages/Products"
import ProductsCategorized from "./pages/ProductsCategorized"
import About from "./pages/About"
import Account from "./pages/Account"
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={<Layout />}
                    >
                        <Route index element={<Home />} />
                        <Route path="products" element={<Products />} />
                        <Route path="productscat" element={<ProductsCategorized />} />
                        <Route path="about" element={<About />} />
                        <Route path="account" element={<Account />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

ReactDOM
    .createRoot(document.getElementById('root'))
    .render(<App />)