import { useState, createContext, useContext } from "react";

const CartContext = createContext()

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([])
    const [openCart, setOpenCart] = useState(false)

    const addToCart = (product) => {
        const priceValue = parseFloat(product.price.split('/')[0].trim())

        const newItem = {
            ...product,
            price: priceValue,
            quantity: Number(product.quantity || 1)
        }

        setCartItems((prevCartItems) => {
            const existingItemIndex = prevCartItems.findIndex((item) => item.id === newItem.id)

            if (existingItemIndex !== -1) {
                const updatedCartItems = [...prevCartItems]
                updatedCartItems[existingItemIndex].quantity += newItem.quantity
                return updatedCartItems
            } else {
                return [...prevCartItems, newItem]
            }
        })

        setOpenCart(true)
    }

    const removeFromCart = (productId) => {
        setCartItems((prevCartItems) =>
            prevCartItems.reduce((acc, item) => {
                if (item.id === productId) {
                    if (item.quantity > 1) {
                        acc.push({ ...item, quantity: item.quantity - 1 })
                    }
                } else {
                    acc.push(item)
                }
                return acc
            }, [])
        )
    }

    const toggleCart = () => {
        setOpenCart((prevState) => !prevState)
    }

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            openCart,
            toggleCart,
            setOpenCart
        }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext)