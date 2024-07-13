import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import CheckOut from "./components/CheckOut/CheckOut";
import Category from "./components/Category/Category";
import SingleProduct from "./components/SingleProduct/SingleProduct";
import Banner from "./components/Home/Banner/Banner";
import { createContext, useState, useEffect } from "react";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";

export const AppContext = createContext();

function App() {
    const [categories, setCategories] = useState();
    const [products, setProducts] = useState();
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartSubTotal, setCartSubTotal] = useState(0);    
    
    useEffect(() => {
        let count = 0;
        cartItems?.map((item) => (count += item.attributes.quantity));
        setCartCount(count);

        let subTotal = 0;
        cartItems.map(
            (item) =>
                (subTotal += item.attributes.price * item.attributes.quantity)
        );
        setCartSubTotal(subTotal);
    }, [cartItems]);

    const handleAddToCart = (product, quantity) => {
        let items = [...cartItems];
        let index = items?.findIndex((p) => p.id === product?.id);
        if (index !== -1) {
            items[index].attributes.quantity += quantity;
        } else {
            product.attributes.quantity = quantity;
            items = [...items, product];
        }
        setCartItems(items);
    };

    const handleRemoveFromCart = (product) => {
        let items = [...cartItems];
        items = items?.filter((p) => p.id !== product?.id);
        setCartItems(items);
    };

    const handleCartProductQuantity = (type, product) => {
        let items = [...cartItems];
        let index = items?.findIndex((p) => p.id === product?.id);
        if (type === "inc") {
            items[index].attributes.quantity += 1;
        } else if (type === "dec") {
            if (items[index].attributes.quantity === 1) return;
            items[index].attributes.quantity -= 1;
        }
        setCartItems(items);
    };

    const clearCart = () => {
        setCartItems([]);
        setCartSubTotal(0);
    };

    return (
        <AppContext.Provider value={{
            products,
            setProducts,
            categories,
            setCategories,
            cartItems,
            setCartItems,
            handleAddToCart,
            cartCount,
            handleRemoveFromCart,
            showCart,
            setShowCart,
            handleCartProductQuantity,
            cartSubTotal,
            clearCart, // Add clearCart to the context provider value
        }}>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contactus" element={<Contact />} />
                    <Route path="/category/:id" element={<Category />} />
                    <Route path="/product/:id" element={<SingleProduct />} />
                    <Route path="/checkout" element={<CheckOut />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </AppContext.Provider>
    );
}

export default App;
