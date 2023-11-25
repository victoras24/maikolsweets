import React, { useRef, useEffect, useState } from "react";
import { usePresence, motion, AnimatePresence } from "framer-motion";
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

const Box = ({ handleTypeChange, selectedType, setSelectedType }) => {
    return (
        <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="box"
        >
            <li onClick={() => handleTypeChange("")}>View all</li>
            {types.map((type) => (
                <li
                    key={type}
                    onClick={() => handleTypeChange(type)}
                    style={{ pointerEvents: type === selectedType ? "none" : "auto" }}
                >
                    {type}
                </li>
            ))}
        </motion.ul>
    )
}

export default function ProductTypeBox({ handleTypeChange }) {
    const ref = useRef(null)
    const [isPresent, safeToRemove] = usePresence()
    const [show, setShow] = useState(false)
    const [selectedType, setSelectedType] = useState("")

    useEffect(() => {
        if (!isPresent) {
            gsap.to(ref.current, {
                opacity: 0,
                onComplete: () => safeToRemove?.(),
            })
        }
    }, [isPresent, safeToRemove])

    const toggleShow = () => {
        setShow(!show)
        if (show) {
            gsap.to(ref.current, {
                opacity: 0,
                onComplete: () => safeToRemove?.(),
            })
        }
    }

    const handleTypeSelect = (type) => {
        setSelectedType(type)
        handleTypeChange(type)
        toggleShow()
    }

    return (
        <div>
            <div ref={ref} />
            <div className="type-container">
                <div className="controls">
                    <motion.button
                        className="filter-button"
                        whileTap={{ scale: 0.9 }}
                        onClick={toggleShow}
                    >
                        {selectedType ? `${selectedType} products` : "Show types"}
                    </motion.button>
                </div>

                <AnimatePresence>
                    {show && (
                        <Box
                            handleTypeChange={handleTypeSelect}
                            selectedType={selectedType}
                            setSelectedType={setSelectedType}
                        />
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
