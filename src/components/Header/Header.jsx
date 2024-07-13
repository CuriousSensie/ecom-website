import "./Header.scss";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import  { TbSearch, TbPhone } from "react-icons/tb";
import  { CgShoppingCart } from "react-icons/cg";
import  { AiOutlineHeart } from "react-icons/ai";
import Search from "./Search/Search";
import Cart from "../Cart/Cart";
import {AppContext} from "../../App";

const Header = () => {
    const navigate = useNavigate();
    const { cartCount } = useContext(AppContext);

    // using the useEffect method to handle the header action on scroll
    // useEffect aisa method ha jo sab se pehle call hota ha aur har update par rerender bhi hota ha
    const [scrolled, setScrolled] = useState(false);
    const [showCart, setShowCart] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const handleScroll = () => {
        const offset = window.scrollY


        if (offset > 200) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    }

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

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <header className={`main-header ${scrolled ? "sticky-header" : ""}`}>
                <div className="header-container">
                    <ul className="left">
                        <li onClick={() =>{ 
                            navigate("/") 
                            window.scrollTo(0, 0);
                        }}>Home</li>
                        <li onClick={() => {
                                navigate("/about") 
                                window.scrollTo(0,0)
                            }}>About</li>
                        <li onClick={()=>{
                                goToShop();
                            }}>
                            Categories
                        </li>
                    </ul>
                <div className="center" onClick={() => {
                    navigate("/")
                    window.scrollTo(0, 0);  
                    }}>Tbb</div>
                <div className="right">
                    <TbSearch onClick={() => setShowSearch(true)} />
                    <TbPhone onClick={() => {
                    navigate("/contactus");
                    window.scrollTo(0,0)
                    }}/>
                    <span className="cart-icon" onClick={() => setShowCart(true)}>
                        <CgShoppingCart />
                        {!!cartCount && <span className="cart-count">{cartCount}</span>}
                    </span>
                </div> 
                </div>
            </header>
            {showCart && <Cart setShowCart={setShowCart} />}
            {showSearch && <Search setShowSearch={setShowSearch} />}
        </>
    );
};

export default Header;