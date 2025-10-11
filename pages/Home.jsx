import { Link } from "react-router-dom";
import logo from "/assets/front-photo.jpg";

export default function Home() {
  return (
    <div className="home-page-main-wrapper">
      <div className="main-photo">
        <img className="main-photo-img" src={logo} alt="main photo" />
        <div className="main-photo-text">
          <h2 className="main-title">Welcome to Eleni Sweets</h2>
          <h3>Discover the Sweet Side of Life</h3>
          <div className="main-photo-links">
            <Link className="main-photo-about-link" to="login">
              My Account <i className="fa-solid fa-chevron-right"></i>
            </Link>
            <Link className="main-photo-product-link" to="products">
              Products <i class="fa-solid fa-chevron-right"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
