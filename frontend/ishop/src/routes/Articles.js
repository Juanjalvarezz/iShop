import React from 'react';
import Articles from '../components/Articles';
import { Routes, Route } from 'react-router-dom'; // Importa Routes y Route desde react-router-dom
import Header from "../components/header";
import '../assets/css/App.css';


const articles = () => {
    return (
        <>
            <Header />
            <Routes> 
                <Route exact path="/*" element={<Articles />} /> 
            </Routes>
        </>
    );
}

export default articles;