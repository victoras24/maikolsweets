import { motion } from "framer-motion";


export default function About() {
    return (
        <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring" }}
            layout
            className="about-container">
            <img className="about-image-top" src="https://images.pexels.com/photos/3218467/pexels-photo-3218467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
            <div className="about-text">
                <p>
                    Meet the creative force behind Eleni Seets Sweets, Eleni. Residing in
                    the picturesque city of Paphos, Cyprus, Eleni embarked on the sweet-making journey
                    driven by pure passion.
                </p>
            </div>
            <img className="about-image-middle"
                src="https://images.pexels.com/photos/974386/pexels-photo-974386.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
            <div className="about-text-middle">
                <p>
                    His story is one of spontaneity and genuine love for crafting
                    delectable treats. Unfettered by plans or trends, Eleni's foray into homemade sweets
                    is a testament to his dedication to sharing the joy of sweetness with each creation.
                </p>
            </div>
            <img className="about-image-end"
                src="https://images.pexels.com/photos/8642065/pexels-photo-8642065.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" />
            <div className="about-text-end">
                <p>Join us as we delve into the delightful world of Eleni Sweets, where every treat is a
                    product of Eleni's unwavering passion and commitment to the art of sweet making.</p>
            </div>
            <img src="https://images.pexels.com/photos/3302494/pexels-photo-3302494.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" />
        </motion.div>
    )
}