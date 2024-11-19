// src/pages/Logout.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/userSlice"; // Assuming you have an auth slice
import { setCart } from "../redux/slices/cartSlice";

const Logout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(logout());
        dispatch(setCart([]))
        navigate("/");
    }, [dispatch, navigate]);

    return null;
};

export default Logout;
