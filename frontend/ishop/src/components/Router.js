import React from "react";
import { Routes, Route } from 'react-router-dom'; // Importa Routes y Route desde react-router-dom
import Header from "./header";
import New from "./New";
import Background from './background';



const Admin = () => {
    return (
        <div >
            <Background>
            <Header />
            <Routes> 
                <Route exact path="/" element={<New />} /> 
            </Routes>
            </Background>
        </div>
    );
}

export default Admin;
