import "./CartItem.scss";
import { MdClose } from "react-icons/md";
import { useContext } from "react";
import { AppContext } from "../../../App";

const CartItem = () => {
    const { cartItems, handleCartProductQuantity, handleRemoveFromCart } = useContext(AppContext);

    return (
        <div className="cart-products">
            {cartItems?.map(item => (
                <div key={item?.id} className="cart-product">
                    <div className="img-container">
                        <img
                            src={`${process.env.REACT_APP_DEV_URL}${item?.attributes?.img?.data?.[0]?.attributes?.url}`}
                            alt=""
                        />
                    </div>
                    <div className="product-details">
                        <div className="name">{item.attributes.title}</div>
                        <div className="quantity-buttons">
                            <span className="minus" onClick={() => handleCartProductQuantity('dec', item)}>-</span>
                            <span className="quantity">{item.attributes.quantity}</span>
                            <span className="plus" onClick={() => handleCartProductQuantity('inc', item)}>+</span>
                        </div>
                        <div className="text">
                            <span>{item.attributes.quantity}</span>
                            <span>x</span>
                            <span className="highlight"> {item.attributes.price} = Rs {item.attributes.price * item.attributes.quantity}</span>
                        </div>
                    </div>
                    <div className="remove-button" onClick={() => handleRemoveFromCart(item)}>
                        <MdClose />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CartItem;