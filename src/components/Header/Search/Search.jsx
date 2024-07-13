import "./Search.scss";
import { MdClose } from "react-icons/md";
import Product from "../../../assets/products/1.1.png"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";


const Search = ({setShowSearch}) => {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const onChange = (event) => {
        setQuery(event.target.value);
    }

    let {data} = useFetch(`/api/products?populate=*&filters[title][$contains]=${query}`);
    console.log(data);

    if (!query.length) {
        data = null;
    }

    return (
        <div className="search-module">
            <div className="form-field">
                <input 
                    type="text" 
                    autoFocus 
                    placeholder="Search for Products" 
                    className="search-bar" 
                    value={query}
                    onChange={onChange}
                    />
                <MdClose onClick={() => setShowSearch(false)}/>
            </div>
            <div className="search-result-content">
                <div className="search-results">
                    {data?.data?.map(item => (
                        <div key={item.id} className="search-result-item" onClick={() => {
                            navigate("/product/" + item.id);
                            setShowSearch(false);
                        }}>
                        <div className="img-container">
                            <img src={process.env.REACT_APP_DEV_URL + item.attributes.img.data[0].attributes.url} alt="" />
                        </div>
                        <div className="product-details">
                            <div className="name">{item.attributes.title}</div>
                            <div className="desc">{item.attributes.Desc}</div>                            
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Search;
