// Users.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import UsersInfo from "./UsersInfo";
import { NavLink } from 'react-router-dom';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/users');
            setUsers(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error al obtener usuarios:", error);
            setLoading(false);
        }
    };

    return (
        <div>
                   <div className='profile'>
        <h2>Usuarios</h2>
                <NavLink to='/admin' className="navbar-brand">
                <button className="nav-link" value="Publicar">Atras <i class="fa-solid fa-backward"></i></button>
                </NavLink>
        </div>
        <div className="publicaciones">
            <div className="search">
                <h1 className="mt-3 title">Información de Usuarios</h1>
                <div className="container mt-3">
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-2">
                        {loading ? (
                            <h3 className="mx-auto">Cargando...</h3>
                        ) : users.length > 0 ? (
                            users.map((user, index) => (
                                <UsersInfo key={index} userData={user} />
                            ))
                        ) : (
                            <h3 className="mx-auto">No hay usuarios que mostrar</h3>
                        )}
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Users;
