import { Navigate } from 'react-router-dom';
import useAuth from './hooks/useAuth';

const ProtectedRoute = ({ children }) => {
    const authUser = useAuth();
    authUser();

    return children;
}

export default ProtectedRoute;