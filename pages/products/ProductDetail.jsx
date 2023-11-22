import { Link, useLocation, useParams } from "react-router-dom"
import products from "../../data/products.json"

export default function ProductDetail() {

    const location = useLocation()
    const { id } = useParams()
    const search = location.state?.search || ""
    const type = location.state?.type || "all"
    const clickedProduct = products.find((product) => product.id === parseInt(id))

    return (
        <div className="product-detail-container">
            <Link
                to={`..${search}`}
                relative="path"
                className="back-button"
            >
                &larr; <span> Back to {type} products </span>
            </Link>
            {
                clickedProduct &&
                (
                    <div className="product-detail">
                        <div className="product-detail-img-container">
                            <img className="product-detail-img" src={clickedProduct.image} alt="clickedProduct image" />
                        </div>
                        <i className={`clickedProduct-type ${clickedProduct.type} selected`}>
                            {clickedProduct.type}
                        </i>
                        <h2>{clickedProduct.name}</h2>
                        <p className="clickedProduct-price">{`€${clickedProduct.price}`}</p>
                        <p>{clickedProduct.description}</p>
                        <div>
                            <button className="add-to-cart-button">Add to cart</button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}