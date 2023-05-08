import { useEffect } from "react";
import { Navigate, useOutletContext } from "react-router-dom";

const Logout = () => {
    const { logout } = useOutletContext();

    useEffect(() => {
        logout();
    }, [])

    return (
        <Navigate to='/login' />
    )
}

export default Logout;