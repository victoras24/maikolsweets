import { useState, createContext, useContext } from "react"

const CartContext = createContext()

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([])
    const [openCart, setOpenCart] = useState(false)

    const addToCart = (product) => {
        setCartItems((prevCartItems) => ([...prevCartItems, product]))
        setOpenCart(true)
    }

    const toggle = () => {
        setOpenCart((prevState) => !prevState)
    }

    const removeFromCart = (productId) => {
        setCartItems((prevCartItems) => {
            return prevCartItems.filter((item) => item.id !== productId)
        })
    }

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, openCart, toggle, setOpenCart }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    return useContext(CartContext)
}