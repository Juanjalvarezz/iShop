import React from "react";
import { NavLink } from 'react-router-dom';
import logo from "../assets/image/logoApple.png"

const Header = () => {
    return (

        <nav id="navbar" className="navbar navbar-expand-lg navbar-dark bg-dark">

            <div className="container">
            <img className="App-logo" src={logo} alt="logo" width={130}/>
                <NavLink to='/admin' className="navbar-brand">
                <button className="nav-link" value="Publicar">Publicar <i class="fa-solid fa-upload"></i></button>
                </NavLink>

                <ul className="navbar-nav">
                    <li className="nav-item">
                    <NavLink to='/articles' className="nav-link">Articulos <i class="fa-solid fa-bag-shopping"></i></NavLink>
                    </li>
                </ul>

                <NavLink to='/users' className="navbar-brand">
                <button className="nav-link" value="Info Usuarios">Info de Usuarios <i class="fa-solid fa-circle-info"></i></button>
                </NavLink>

                <NavLink to='/login' className="navbar-brand">
                <button className="nav-link" value="Publicar">Cerrar Sesion <i className="fa-solid fa-trash"></i></button>
                </NavLink>
            </div>

        </nav>
    );
}

export default Header;