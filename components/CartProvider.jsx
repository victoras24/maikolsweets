
import { useState, createContext, useContext } from "react"

const CartContext = createContext()

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([])
    const [openCart, setOpenCart] = useState(false)

    const addToCart = (product) => {
        const existingItemIndex = cartItems.findIndex((item) => item.id === product.id)

        if (existingItemIndex !== -1) {
            // If the product with the same ID already exists, update its quantity
            const updatedCartItems = [...cartItems]
            updatedCartItems[existingItemIndex].quantity += product.quantity
            setCartItems(updatedCartItems)
        } else {
            // If the product does not exist, add it to the cart
            setCartItems((prevCartItems) => ([...prevCartItems, { ...product }]))
        }

        setOpenCart(true)
    }

    const toggle = () => {
        setOpenCart((prevState) => !prevState)
    }

    const removeFromCart = (productId) => {
        setCartItems((prevCartItems) => {
            const updatedCartItems = prevCartItems.map((item) => {
                if (item.id === productId) {
                    if (item.quantity > 1) {
                        // If quantity is greater than 1, decrement the quantity
                        return { ...item, quantity: item.quantity - 1 }
                    } else {
                        // If quantity is 1, remove the item
                        return null
                    }
                }
                return item
            })

            return updatedCartItems.filter((item) => item !== null)
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
