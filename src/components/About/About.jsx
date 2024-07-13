import { useNavigate } from "react-router-dom";
import "./About.scss";


const About = () => {
    const navigate = useNavigate();
    return (
        <div className="about">
            <section className="hero">
                <h1>About Us</h1>
                <p>Welcome to TBB, your number one destination for beauty and health products. As a new and innovative player in the e-commerce market, we are committed to providing our customers with the highest quality products and exceptional customer service.</p>
                <p>At TBB, we believe that beauty and health go hand in hand. Our mission is to help you look and feel your best by offering a carefully curated selection of products that cater to all your beauty and health needs. Whether you're looking for skincare, makeup, haircare, wellness supplements, or fitness gear, we have something for everyone.</p>
            </section>

            <section className="our-mission">
                <h2>Our Mission</h2>
                <p>Quality is at the heart of everything we do. We are dedicated to sourcing products from trusted brands and suppliers who share our commitment to excellence. Each product in our store is carefully selected and rigorously tested to ensure it meets our high standards. We believe in transparency and provide detailed information about the ingredients and benefits of each product, so you can make informed choices that are right for you.</p>
            </section>
            
            <section className="our-values">
                <h2>Our Values</h2>
                <ul>
                <li>Wide Range of Products: From everyday essentials to luxurious treatments, our extensive selection ensures you can find exactly what you need.</li>
                <li>Expert Advice: Our team of beauty and health experts is always on hand to offer personalized recommendations and advice.</li>
                <li>Secure Shopping: Your security is our priority. We use the latest encryption technology to ensure your personal and payment information is safe and secure.</li>
                <li>Fast and Reliable Delivery: We understand the excitement of receiving your order quickly. That's why we offer fast and reliable shipping options to get your products to you as soon as possible.</li>
                <li>Customer Satisfaction: Your satisfaction is our top priority. If you have any questions or concerns, our customer service team is here to help.</li>
                </ul>
            </section>

            <section className="contact-us">
                <h2>Contact Us</h2>
                <p>If you have any questions or comments, please don't hesitate to <b onClick={() => navigate("/contactus")}>CONTACT US</b></p>
            </section>
        </div>
    );
}

export default About;
