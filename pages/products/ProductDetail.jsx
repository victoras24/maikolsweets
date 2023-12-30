import { Link, useLocation, useParams } from "react-router-dom"
import productsData from "../../data/products.json"
import { useCart } from "../../components/CartProvider"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons"

export default function ProductDetail() {
    const { addToCart } = useCart()

    const location = useLocation()
    const { id } = useParams()
    const search = location.state?.search || ""
    const type = location.state?.type || "all"

    const products = JSON.parse(JSON.stringify(productsData))

    const clickedProduct = products.find((product) => product.id === Number(id))

    return (

        clickedProduct &&

        (<div className="product-detail-container">
            <div className="product-detail-img-container">
                <img className="product-detail-img" src={clickedProduct.image} alt="clickedProduct image" />
                <Link to={`..${search}`} relative="path" className="back-button">
                    <FontAwesomeIcon className="back-button-icon" icon={faAngleLeft} />
                    <p> {type.charAt(0).toUpperCase() + type.slice(1)} products </p>
                </Link>
                <div className="overlay">
                    <div className="product-detail">
                        <i className={`clickedProduct-type ${clickedProduct.type} selected`}>
                            {clickedProduct.type}
                        </i>
                        <h2>{clickedProduct.name}</h2>
                        <p className="clickedProduct-price">{`€${clickedProduct.price}`}</p>
                        <p>{clickedProduct.description}</p>
                        <div className="add-to-cart-button-container">
                            <button className="add-to-cart-button" onClick={() => addToCart(clickedProduct)}>Add to cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        )
    )
}