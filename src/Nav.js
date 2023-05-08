import { Link, NavLink } from 'react-router-dom';
import './Nav.css'

const Nav = ({ user }) => {
    const isLoggedIn = user.username ? true : false;

    return (
        <nav id='nav-bar'>
            <div id='banner'>
                <Link>Jobly</Link>
            </div>
            <div id='links'>
                {!isLoggedIn && <>
                    <NavLink to='signup'>Sign up</NavLink>
                    <NavLink to='login'>Login</NavLink>
                </>}
                {isLoggedIn && <>
                    <NavLink to='companies'>Companies</NavLink>
                    <NavLink to='jobs'>Jobs </NavLink>
                    <NavLink to='profile'>Profile </NavLink>
                    <NavLink to='logout'>Logout</NavLink>
                </>}
            </div>
        </nav>
        
    )
}

export default Nav;