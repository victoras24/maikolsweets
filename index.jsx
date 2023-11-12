import React from "react"
import ReactDOM from "react-dom/client"
import Layout from "./components/Layout"
import Home from "./pages/Home"
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
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

ReactDOM
    .createRoot(document.getElementById('root'))
    .render(<App />)