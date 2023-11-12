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
            </div>
            <div className="main-button-container">
                <button className="main-button">View our Products</button>
            </div>
        </div>
    )
}