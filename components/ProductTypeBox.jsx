import React, { useRef, useEffect, useState } from "react";
import { motion, usePresence } from "framer-motion";
import { gsap } from "gsap";
import products from "../data/products.json";

const typesSet = new Set()
const types = products.map((product) => {
    if (!typesSet.has(product.type)) {
        typesSet.add(product.type)
        return product.type
    }
    return null // Return null for duplicate types
}).filter(Boolean) // Filter out null values

const TypeList = ({ handleTypeChange, selectedType }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="type-list"
        >
            <div
                onClick={() => handleTypeChange("")}
                className={`type-box ${selectedType === "" ? "selected" : ""}`}
            >
                View all
            </div>
            {types.map((type) => (
                <div
                    key={type}
                    onClick={() => handleTypeChange(type)}
                    className={`type-box ${type === selectedType ? "selected" : ""}`}
                >
                    {type}
                </div>
            ))}
        </motion.div>
    )
}

export default function ProductTypeBox({ handleTypeChange }) {
    const ref = useRef(null)
    const [isPresent, safeToRemove] = usePresence()
    const [selectedType, setSelectedType] = useState("")

    useEffect(() => {
        if (!isPresent) {
            gsap.to(ref.current, {
                opacity: 0,
                onComplete: () => safeToRemove?.(),
            })
        }
    }, [isPresent, safeToRemove])

    const handleTypeSelect = (type) => {
        setSelectedType(type)
        handleTypeChange(type)
    }

    return (
        <div>
            <div ref={ref} />
            <div className="type-container">
                <TypeList
                    handleTypeChange={handleTypeSelect}
                    selectedType={selectedType}
                />
            </div>
        </div>
    )
}
