import React, { useRef, useEffect, useState } from "react";
import { usePresence, motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import products from "../data/products.json";

const types = products.map((product) => product.type)

const Box = ({ handleTypeChange }) => {
    return (
        <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="box"
        >
            <li onClick={() => handleTypeChange("")}>View all</li>
            {types.map((type) => (
                <li key={type} onClick={() => handleTypeChange(type)}>
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

                <AnimatePresence>{show && <Box handleTypeChange={handleTypeSelect} />}</AnimatePresence>
            </div>
        </div>
    );
}
