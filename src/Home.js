import { useContext } from 'react';
import { UserContext } from './App';
import "./Home.css";

const Home = () => {
    const { currUser } = useContext(UserContext);
    const loginMessage = `Welcome back ${currUser.username}`;
    const genericMessage = 'Welcome to Jobly';

    return (
        <h1>{currUser.username ? loginMessage : genericMessage}</h1>
    )
}

export default Home;