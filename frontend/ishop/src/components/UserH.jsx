import React from "react";
import { NavLink } from 'react-router-dom';
import logo from "../assets/image/logoApple.png"

const userH = () => {
    return (

        <nav id="navbar" className="navbar navbar-expand-lg navbar-dark bg-dark">

            <div className="container">
            <img className="App-logo" src={logo} alt="logo" width={130}/>
                <NavLink to='/perfil' className="navbar-brand">
                <button className="nav-link" value="Perfil">Perfil <i class="fa-solid fa-user"></i></button>
                </NavLink>

                <ul className="navbar-nav">
                    <li className="nav-item">
                    <NavLink to='/favoritos' className="nav-link">Favoritos <i class="fa-solid fa-heart"></i></NavLink>
                    </li>
                </ul>

                <NavLink to='/login' className="navbar-brand">
                <button className="nav-link" value="Cerrar">Cerrar Sesion <i className="fa-solid fa-trash"></i></button>
                </NavLink>
            </div>

        </nav>
    );
}

export default userH;