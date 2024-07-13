import "./SingleProduct.scss";
import useFetch from "../../hooks/useFetch";
import RelatedProducts from "./RelatedProducts/RelatedProducts";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPinterest, FaCartPlus } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useContext} from "react";
import { AppContext } from "../../App";

const SingleProduct = () => {
    const { id } = useParams();
    const { data } = useFetch(`/api/products?populate=*&[filters][id]=${id}`);
    const [quantity, setQuantity] = useState(1);
    const { handleAddToCart } = useContext(AppContext);

    const increment = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
    }

    const decrement = () => {
        setQuantity((prevQuantity) => {
            if (prevQuantity > 1) {
                return prevQuantity - 1;
            }
            return prevQuantity;
        });
    }

    if (!data || !data.data || !data.data[0]) {
        return <div>Loading...</div>;
    }

    const product = data.data[0].attributes;
    const imageUrl = product?.img?.data?.[0]?.attributes?.url || '';
    const categoryTitle = product?.categories?.data?.attributes?.title || '';

    return (
        <div className="single-product-main-content">
            <div className="layout">
                <div className="single-product-page">
                    <div className="left">
                        <img src={process.env.REACT_APP_DEV_URL + imageUrl} alt={product?.title} />
                    </div>
                    <div className="right">
                        <span className="name">
                            {product?.title}
                        </span>
                        <span className="price">
                            Rs {product?.price}
                        </span>
                        <span className="desc">
                            {product?.Desc}
                        </span>

                        <div className="cart-buttons">
                            <div className="quantity-buttons">
                                <span className="minus" onClick={decrement}>-</span>
                                <span className="quantity">{quantity}</span>
                                <span className="plus" onClick={increment}>+</span>
                            </div>
                            <button 
                                className="add-to-cart-button" 
                                onClick={() => {
                                    handleAddToCart(data.data[0], quantity);
                                    setQuantity(1);
                                }}>
                                <FaCartPlus size={20} />
                                ADD TO CART
                            </button>
                        </div>

                        <span className="divider"></span>
                        <div className="info-items">
                            <span className="text-bold">
                                Category:{' '}
                                <span className="text"> 
                                    {product.categories.data[0].attributes.title}
                                </span>
                            </span>
                            <span className="text-bold">
                                Share:
                                <span className="social-icons">
                                    <FaFacebook size={16} />
                                    <FaInstagram size={16} />
                                    <FaLinkedin size={16} />
                                    <FaPinterest size={16} />
                                    <FaTwitter size={16} />
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
                <RelatedProducts prodID={id} categoryID={product.categories.data[0].id}/>
            </div>
        </div>
    );
};

export default SingleProduct;
