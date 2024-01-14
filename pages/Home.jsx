import { Link } from "react-router-dom"

export default function Home() {

    return (
        <div className="home-page-main-wrapper">
            <div className="main-photo">
                <img className="main-photo-img" src="https://images.pexels.com/photos/7816720/pexels-photo-7816720.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="main photo" />
                <div className="main-photo-text">
                    <h2 className="main-title">Welcome to Maikol Sweets</h2>
                    <h3>Discover the Sweet Side of Life</h3>
                    <div className="main-photo-links">
                        <Link className="main-photo-about-link" to="about">About us <i className="fa-solid fa-chevron-right"></i></Link>
                        <Link className="main-photo-product-link" to="products">Products <i class="fa-solid fa-chevron-right"></i></Link>
                    </div>
                </div>
            </div>
            <div className="intro-text">
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
        </div>
    )
}

