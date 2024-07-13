import "./Footer.scss";
import React from "react";
import { FaLocationArrow, FaMobileAlt, FaEnvelope } from "react-icons/fa";
import Payment from "../../assets/payments.png";
import { useNavigate } from "react-router-dom";



export const Footer = () => {
    const navigate = useNavigate();
    function wait(ms){
        var start = new Date().getTime();
        var end = start;
        while(end < start + ms) {
        end = new Date().getTime();
        }
    }


    const goToShop = async () => {
        navigate("/");
        await wait(100);
        document.getElementById("category-by-id").scrollIntoView();
        window.scrollBy(0, -100);
    }
    return (
        <footer className="footer">
        <div className="footer-content">
            <div className="col">
                <div className="title">About</div>
                <div className="text"><h3>Welcome to TBB!!</h3>We at TBB believe that beauty and health go hand in hand. Our mission is to help you look and feel your best by offering a carefully curated selection of products that cater to all your beauty and health needs. Whether you're looking for skincare, makeup, haircare, wellness supplements, or fitness gear, we have something for everyone.</div>
            </div>
            <div className="col">
                <div className="title">Pages</div>
                <span className="text" onClick={() => {
                    navigate("/");
                    window.scrollTo(0,0)
                    }}>Home</span>
                <span className="text"
                onClick={() => {
                    navigate("/about");
                    window.scrollTo(0,0)
                    }}>About</span>
                <span className="text" onClick={()=> goToShop()}>Shop</span>
                <span className="text" onClick={() => {
                    navigate("/contactus");
                    window.scrollTo(0,0)
                    }}>Contact Us</span>
                <span className="text">Policies</span>
                <span className="text">Terms and Conditions</span>
            </div>
            <div className="col">
                <div className="title" onClick={()=> goToShop()}>Categories</div>
                <span className="text" onClick={() => {
                    navigate("/category/1");
                    window.scrollTo(0,0)
                    }}>Beauty</span>
                <span className="text" onClick={() => {
                    navigate("/category/2");
                    window.scrollTo(0,0)
                    }}>Health</span>
            </div>
            <div className="col">
                <div className="title">Contact</div>
                <div className="c-item">
                    <FaLocationArrow />
                    <div className="text">Plaza this and Office that</div>
                </div>
                <div className="c-item">
                    <FaMobileAlt />
                    <div className="text">03011234567</div>
                </div>
                <div className="c-item">
                    <FaEnvelope />
                    <div className="text">email@email.com</div>
                </div>
            </div>
        </div>
        <div className="bottom-bar">
                <div className="bottom-bar-content">
                    <div className="text">The Beauty Bar</div>
                    <div className="image">
                        <img src={Payment} alt="" />
                    </div>
                </div>
            </div>

        </footer>
    );
};

export default Footer;
