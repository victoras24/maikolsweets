import { Link, useLocation, useParams } from "react-router-dom"
import productsData from "../../data/products.json"
import { useCart } from "../../components/CartProvider"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import { motion } from "framer-motion"

export default function ProductDetail() {
    const { addToCart } = useCart()
    const [saved, setSaved] = useState(false)
    const [quantity, setQuantity] = useState(1)
    const location = useLocation()
    const { id } = useParams()
    const search = location.state?.search || ""
    const type = location.state?.type || "all"

    const products = JSON.parse(JSON.stringify(productsData))

    const toggleSaved = () => {
        setSaved((prevState) => !prevState)
    }

    const clickedProduct = products.find((product) => product.id === Number(id))

    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value, 10)
        setQuantity(value > 0 ? value : 0)
    }

    const handleAddToCart = () => {
        addToCart({ ...clickedProduct, quantity: quantity })
    }

    return (
        clickedProduct && (
            <div className="product-detail-container">
                <div className="product-detail-img-container">
                    <img className="product-detail-img" src={clickedProduct.image} alt="clickedProduct image" />
                    <Link to={`..${search}`} relative="path" className="back-button">
                        <FontAwesomeIcon className="product-detail-back-button-icon" icon={faArrowLeft} />
                    </Link>
                    {saved ? (
                        <motion.i whileTap={{ scale: 0.7 }} className="fa-solid fa-heart saved" onClick={toggleSaved} />
                    ) : (
                        <motion.i whileTap={{ scale: 0.7 }} className="fa-regular fa-heart" onClick={toggleSaved} />
                    )}
                    <div className="black-overlay"></div>
                    <div className="product-detail-overlay">
                        <div className="product-detail">
                            <i className={`clickedProduct-type ${clickedProduct.type} selected`}>{clickedProduct.type}</i>
                            <h2>{clickedProduct.name}</h2>
                            <span className="clickedProduct-price">{`€${clickedProduct.price}`}</span>
                            <p>{clickedProduct.description}</p>
                            <div className="add-to-cart-button-container">
                                <button className="add-to-cart-button" onClick={handleAddToCart}>
                                    Add to cart
                                </button>
                                <input
                                    className="product-detail-quantity"
                                    type="text"
                                    id="quantity"
                                    name="quantity"
                                    min="1"
                                    value={quantity}
                                    onChange={handleQuantityChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    )
}
