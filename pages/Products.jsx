import { NavLink } from "react-router-dom"
import products from "../data/products.json"

export default function Products() {

    const productElements = products.map(product => (
        <div key={product.id} className="product-title">
            <NavLink
                to={product.id}
                style={{ textDecoration: "none" }}
            >
                <img src={product.image} alt="Product image" />
                <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-price">€{product.price}</p>
                </div>
            </NavLink>
        </div>
    ))

    return (
        <div className="products-list-container">
            <h1>Explore our product options</h1>
            <div className="products-list">
                {productElements}
            </div>
        </div>
    )
}