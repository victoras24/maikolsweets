import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import ProductTypeBox from "../../components/ProductTypeBox";
import products from "../../data/products.json";

export default function Products() {
    const [searchParams, setSearchParams] = useSearchParams()
    const typeFilter = searchParams.get("type")

    const handleTypeChange = (selectedType) => {
        setSearchParams((prevParams) => {
            if (selectedType === "") {
                prevParams.delete("type")
            } else {
                prevParams.set("type", selectedType)
            }
            return prevParams
        })
    }

    const displayedProducts = typeFilter
        ? products.filter((product) => product.type === typeFilter)
        : products

    return (
        <div className="products-list-container">
            <h2>Explore our products</h2>
            <p className="products-list-disclaimer">
                Indulge in the exquisite flavors of our homemade cakes and sweets, meticulously crafted with the
                freshest and finest ingredients. Your satisfaction is our priority, so feel free to reach out for
                any inquiries about specific food allergies – we're here to ensure your enjoyment is both delightful
                and worry-free.
            </p>
            <ProductTypeBox handleTypeChange={handleTypeChange} />
            <div className="products-list">
                {displayedProducts.map((product) => (
                    <motion.div
                        key={product.id}
                        initial={{ x: 300, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -300, opacity: 0 }}
                        transition={{ type: "spring" }}
                        layout
                        className="product-container">
                        <Link
                            to={product.id.toString()}
                            style={{ textDecoration: "none" }}
                            state={{
                                search: `?${searchParams.toString()}`,
                                type: typeFilter,
                            }}
                        >
                            <motion.img
                                src={product.image}
                                alt="Product image"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            />
                            <div className="product-info">
                                <h3 className="product-name">{product.name}</h3>
                                <p className="product-price">€{product.price}</p>
                            </div>
                            <div className={"product-type"}>{product.type.toUpperCase()}</div>
                        </Link>
                    </motion.div>))}
            </div>
        </div >)
}