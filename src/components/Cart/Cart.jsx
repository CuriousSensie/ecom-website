import "./Cart.scss";
import {MdClose} from "react-icons/md";
import {BsCartX} from "react-icons/bs";
import CartItem from "./CartItem/CartItem";
import { AppContext } from "../../App";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";


const Cart = ({ setShowCart }) => {
    const navigate = useNavigate();
    const { cartItems, cartSubTotal } = useContext(AppContext);
    console.log(cartItems);

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
        <div className="cart-panel">
            <div className="opac-layer"></div>
            <div className="cart-content">
                <div className="cart-header">
                    <span className="heading">Shopping Cart</span>
                    <span className="close-button" onClick={() => setShowCart( false )}>
                        <MdClose />
                        <span className="close-text">CLOSE</span>
                    </span>
                </div>

                {/* empty cart section */}
                {!cartItems?.length && <div className="empty-cart">
                    <BsCartX />
                    <span className="empty-cart-text">No Products in the Cart</span>
                    <button className="return-cta" onClick={() => {
                        goToShop();
                        setShowCart(false);
                        }}>Return to Shop</button>
                </div>}

                {!!cartItems.length && <>
                    <CartItem />
                    <div className="cart-footer">
                        <div className="subtotal">
                            <span className="text">Subtotal: </span>
                            <span className="text total">Rs {cartSubTotal}</span>
                        </div>
                        <div className="button">
                            <button className="checkout-cta" onClick={() => {
                                navigate("/checkout")
                                setShowCart(false)
                            }}>Checkout</button>
                        </div>
                    </div>
                </>}

            </div>
        </div>
    );
};

export default Cart;
