import { Link } from "react-router-dom"
import mainImage from "../assets/main-photo.jpg"

export default function Home() {
    return (
        <div className="main-photo">
            <img src={mainImage} alt="main photo" />
            <div className="intro-text">
                <h1>Welcome to <br />Maikol Sweets!</h1>
                <p>
                    Indulge in the exquisite world of homemade sweets crafted with love and passion.
                    At Maikol Sweets, we take pride in creating delectable treats that not only
                    satisfy your sweet cravings but also warm your heart. Each dessert is carefully
                    handcrafted using the finest ingredients, ensuring a burst of flavors in every bite.
                    Explore our diverse range of sweets, from traditional classics to innovative
                    creations, and embark on a delightful journey of taste and joy.
                </p>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                    the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of
                    type and scrambled it to make a type specimen book. It has survived not only five centuries, but
                    also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in
                    the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with
                    desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
            </div>
            <div className="main-button-container">
                <Link to="products"><button className="main-button">View our Products</button></Link>
            </div>

        </div>
    )
}