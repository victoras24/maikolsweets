import { Link, useSearchParams } from "react-router-dom"
import products from "../../data/products.json"

export default function Products() {

    const [searchParams, setSearchParams] = useSearchParams()

    const typeFilter = searchParams.get("type")

    const displayedProducts = typeFilter
        ? products.filter(product => product.type === typeFilter)
        : products

    const productElements = displayedProducts.map(product => (
        <div key={product.id} className="product-title">
            <Link
                to={`/products/${product.id}`}
                style={{ textDecoration: "none" }}
                state={{
                    search: `?${searchParams.toString()}`,
                    type: typeFilter
                }}
            >
                <img src={product.image} alt="Product image" />
                <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-price">€{product.price}</p>
                </div>
                <i className={`product-type ${product.type} selected`}>{product.type}</i>
            </Link>
        </div>
    ))

    const types = products.map(product => product.type)

    return (
        <div className="products-list-container">
            <h1>Explore our product options</h1>
            <select>
                <option value="">All Types</option>
                {types.map((type) => (
                    <option key={type} value={type}>
                        {type}
                    </option>
                ))}
            </select>
            <div className="products-list">
                {productElements}
            </div>
        </div>
    )
}