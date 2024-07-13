import "./Home.scss";
import Banner from "./Banner/Banner";
import Category from "./Category/Category";
import Products from "../Products/Products";
import { fetchDataFromApi } from "../../utils/api";
import { useEffect, useContext, useState} from "react";
// import { Context } from "../../utils/context";
import { AppContext } from "../../App";



const Home = () => {
    const {categories, setCategories, products, setProducts} = useContext(AppContext);

    useEffect (() => {
        getCategories();
        getProducts();
    }, []);

    const getCategories = () => {
        fetchDataFromApi("/api/categories?populate=*").then((res) => {
            console.log("res");
            setCategories(res);
        });
    };

    const getProducts = () => {
        fetchDataFromApi("/api/products?populate=*").then((res) => {
            console.log("res");
            setProducts(res);
        });
    }

    return (
        <div>
            <Banner />
            <div className="main-content">
                <div id="category-by-id" className="layout">
                    <div className="div-for-categories">
                        <Category categories={categories}/>
                    </div>
                    <div className="product-by-id">
                        <Products products={products} headingText="Best Sellers" innerpage={false} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;