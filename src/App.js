import Nav from './Nav';
import { Outlet, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import JoblyApi from './api';
import useLocalStorage from './hooks/useLocalStorage';
import './App.css';
import { createContext } from 'react';

const UserContext = createContext(null);

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";


function App() {
  
  const initialUserData = {
    username: '',
    firstName: '', 
    lastName: '',
    isAdmin: '',
    applications: []
  }

  const [currUser, setCurrUser] = useState(initialUserData);
  const [token, setToken] = useState(null);
  
  const [ getLocalStorage, setLocalStorage ] = useLocalStorage('user', null);
  const navigate = useNavigate();

  const signup = (user) => {
    const requestSignup = async () => {
      const tokenRes = await JoblyApi.signupUser(user);
      setCurrUser((userData) => ({ ...userData, username: user.username }));
      setToken(tokenRes);
      setLocalStorage({ token: tokenRes, username: user.username });
      navigate('/');
    }
    requestSignup();
  }

  const login = (user) => {
    console.log("I've been clicked");
    const requestLogin = async ()  => {
      const tokenRes = await JoblyApi.loginUser(user);
      setCurrUser((userData) => ({ ...userData, username: user.username }));
      setToken(tokenRes);
      setLocalStorage({ token: tokenRes, username: user.username });
      navigate('/');
    }
    requestLogin();
  }

  const logout = () => {
    setLocalStorage();
    setCurrUser((data) => initialUserData);
  }

  useEffect(() => {
    let user = getLocalStorage();
    if (user) {
      setToken(user.token);
      setCurrUser((curr) => ({...curr, username: user.username}))
    }
  }, [])

  useEffect(() => {
    const requestUser = async () => {
      const userRes = await JoblyApi.getUser(currUser.username);
      setCurrUser(userRes);
    }

    if (token) {
      JoblyApi.token = token;
      requestUser();
    }
  }, [token])

  return (
    <div className="App">
      <Nav user={currUser} />
      <UserContext.Provider value={ {currUser, setCurrUser} }>
        <Outlet context={ {signup, login, logout} }/>
      </UserContext.Provider>
    </div>
  );
}

export default App;
export { UserContext };
