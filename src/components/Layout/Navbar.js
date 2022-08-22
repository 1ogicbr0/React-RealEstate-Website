import {NavLink} from 'react-router-dom'
import styles from './Navbar.module.css'
import AuthContext from '../../store/auth-context'
import React, {useContext, useState} from 'react'
const Navbar = () => {
    const authCtx = useContext(AuthContext)
    const [isNavBarShow, setIsNavBarShow] = useState(false);

    const isLoggedIn = authCtx.isLoggedIn;
    const logoutHandler =() =>{
        authCtx.redirection('LogoutRedirected');
        authCtx.logout();
    }
    console.log("LOGIN?",isLoggedIn);

    const navBarClass = isNavBarShow ? `${styles.navSliderShow}` : `${styles.navSliderHide}`
    const navMenuClass = !isNavBarShow ? `${styles.menu}` : `${styles.noMenu}`
    return <div className={styles.navbar}>
        {/* left logo */}
        <div className={styles.logo}>
        <NavLink to="/properties"><img src="https://www.freepnglogos.com/uploads/logo-home-png/pros-cons-investing-rental-property-piktochart-14.png" alt="realestate" /> </NavLink>
            {/* <h1>Logo</h1> */}
        </div>
        <div className={navBarClass}>
        <ul className={styles.links}>
            <li className={styles.home} onClick={() => {setIsNavBarShow(false)}}> <NavLink to="/properties">  Home </NavLink></li>
            {/* <li className={styles.about}><NavLink to="/properties">About-us</NavLink></li>
            <li className={styles.projects}><NavLink to="/properties">Projects</NavLink></li>
            <li className={styles.blog}><NavLink to="/properties">Blogs</NavLink></li>
            <li className={styles.contact}><NavLink to="/properties">Contact-us</NavLink></li> */}
            {isLoggedIn && <li className={styles.buy} onClick={() => {setIsNavBarShow(false)}}><NavLink to="/new">Add Property</NavLink></li>}
            {isLoggedIn && <li onClick={logoutHandler} className={styles.buy}><NavLink to="/properties">Logout</NavLink></li>}
            {/* LOGIN */}
            {!isLoggedIn && <li  className={styles.login} onClick={() => {setIsNavBarShow(false)}}><NavLink to="/login">Login</NavLink></li>}
        </ul>
        </div>
        <div className={navMenuClass} onClick={() => {setIsNavBarShow(!isNavBarShow)}}><div></div><div></div><div></div></div>

        {/* right pages-nav */}
    </div>
}

export default Navbar;