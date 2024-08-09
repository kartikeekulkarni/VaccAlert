import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "./slice";

export default function LogoutPageComponent() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        localStorage.removeItem('user');
        sessionStorage.clear();
        dispatch(logout()); // Dispatch logout action to update state
        navigate('/');
    }, [navigate, dispatch]);

    return <div>Logging out...</div>;
}
