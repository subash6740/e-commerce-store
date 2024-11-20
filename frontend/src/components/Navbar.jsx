import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setCart } from "../redux/slices/cartSlice";
import { getCart } from '../apis/cart';
import { useSearch } from "../contexts/SearchContext";
import '../css/navbar.css'

const Navbar = () => {
    const state = useSelector(state => state.cart)
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);
    const username = useSelector(state => state.user.username)
    const dispatch = useDispatch();
    const { setProductQuery } = useSearch();

    const handleProductSearch = (e) => {
        e.preventDefault();
        const query = e.target.search.value;
        setProductQuery(query.trim());
    }

    useEffect(() => {
        const SetCart = async () => {
            if (isLoggedIn) {
                const cart = await getCart();
                dispatch(setCart(cart));
            }
        };

        SetCart();
    }, [isLoggedIn, dispatch]);


    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 sticky-top">
            <div className="container">
                <NavLink className="navbar-brand fw-bold fs-4 px-2" to="/"> React All Shop</NavLink>
                <button className="navbar-toggler mx-2" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <form onSubmit={handleProductSearch} className="search-form">
                        <input type="text" placeholder="Search.." name="search" />
                        <button type="submit"><i className="fa fa-search" /></button>
                    </form>

                    <ul className="navbar-nav m-auto my-2 text-center">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">Home </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/products">Products</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/about">About</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/contact">Contact</NavLink>
                        </li>
                    </ul>
                    <div className="buttons text-center">
                        {isLoggedIn ? (
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <NavLink to="/cart" className="nav-link">
                                    <i className="fa-solid fa-bag-shopping fa-xl"><span className='badge' id="cart">{state.length}</span></i>
                                </NavLink>

                                <div className="dropdown">
                                    <NavLink
                                        className="btn btn-outline-light dropdown-toggle"
                                        type="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        {username}
                                    </NavLink>
                                    <div className="dropdown-menu">
                                        <NavLink
                                            to="/profile"
                                            className="btn btn-outline-light dropdown-item p-2"
                                        >
                                            <i className="fa-solid fa-user mr-1"></i> Profile
                                        </NavLink>
                                        <NavLink
                                            to="/order_history"
                                            className="btn btn-outline-light dropdown-item p-2"
                                        >
                                            <i className="fa-solid fa-list mr-1"></i> Orders
                                        </NavLink>
                                        <NavLink
                                            to="/logout"
                                            className="btn btn-outline-light dropdown-item p-2"
                                        >
                                            <i className="fa fa-sign-out-alt mr-1"></i> Logout
                                        </NavLink>
                                    </div>
                                </div>
                            </div>

                        ) : (
                            <div className="dropdown">
                                <NavLink className="btn btn-outline-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Welcome!
                                </NavLink>
                                <div className="dropdown-menu">
                                    <NavLink to="/login" className="btn btn-outline-light dropdown-item p-2"><i className="fa fa-sign-in-alt mr-1"></i> Login</NavLink>
                                    <NavLink to="/register" className="btn btn-outline-light dropdown-item p-2"><i className="fa fa-user-plus mr-1"></i> Register</NavLink>
                                </div>
                            </div>
                        )
                        }
                    </div>
                </div>


            </div>
        </nav>
    )
}

export default Navbar