import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setCart } from "../redux/slices/cartSlice";
import { getCart } from '../apis/cart';

const Navbar = () => {
    const state = useSelector(state => state.cart)
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);
    const dispatch = useDispatch();

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
                            <>
                                <NavLink to="/cart" className="btn btn-outline-dark m-2"><i className="fa fa-cart-shopping mr-1"></i> Cart ({state.length}) </NavLink>
                                <NavLink to="/order_history" className="btn btn-outline-dark m-2"><i className="fa fa-cart-shopping mr-1"></i> Orders </NavLink>
                                <NavLink to="/logout" className="btn btn-outline-dark m-2"><i className="fa fa-sign-in-alt mr-1"></i> Logout</NavLink>
                            </>
                        ) : (
                            <>
                                <NavLink to="/login" className="btn btn-outline-dark m-2"><i className="fa fa-sign-in-alt mr-1"></i> Login</NavLink>
                                <NavLink to="/register" className="btn btn-outline-dark m-2"><i className="fa fa-user-plus mr-1"></i> Register</NavLink>
                            </>
                        )
                        }
                    </div>
                </div>


            </div>
        </nav>
    )
}

export default Navbar