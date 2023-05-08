import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../App';

const useAuth = () => {
    const { currUser } = useContext(UserContext);
    const navigate = useNavigate();

    const authUser = () => {
        if (!currUser.username) {
            navigate('/');
        }    
    }

    return authUser;
}

export default useAuth;