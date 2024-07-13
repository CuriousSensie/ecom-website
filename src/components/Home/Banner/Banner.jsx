import "./Banner.scss";
import BannerImg from "../../../assets/Banner.png";
import { useNavigate } from "react-router-dom";



const goToShop = () => {
    document.getElementById("category-by-id").scrollIntoView();
    window.scrollBy(0, -100);
}

const Banner = () => {
    const navigate = useNavigate();
    return (
        <div className="hero-banner">
            <div className="content">
                <div className="text-content">
                    <h1 className="title">Sales</h1>
                    <p className="description">
                    Welcome to TBB, your number one destination for beauty and health products. As a new and innovative player in the e-commerce market, we are committed to providing our customers with the highest quality products and exceptional customer service.
                    </p>
                    <div className="ctas">
                        <div className="banner-cta" onClick={()=> navigate("/about")}>Read More</div>
                        <div className="banner-cta-shop" onClick={()=> goToShop()}>Shop Now</div>
                    </div>
                </div>
                <img src={BannerImg} alt="banner-img" className="banner-img" />
            </div>
        </div>
    );
    
};

export default Banner;
