import React, { useState } from "react";
import axios from "axios";

const UsersInfo = ({ userData, onDelete, onUpdate }) => {
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        userName: userData.userName
    });

    const { _id } = userData;

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:4000/api/users/${_id}`, formData);
            console.log(response.data); // Mensaje de éxito o datos actualizados del usuario
            setEditing(false);
            if (onUpdate) {
                onUpdate(_id, formData); // Actualiza el usuario en la lista de usuarios
            }
        } catch (error) {
            console.error("Error al editar usuario:", error);
        }
    };

    const handleEditClick = () => {
        setEditing(true);
    };

    const handleCloseModal = () => {
        setEditing(false);
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:4000/api/users/${_id}`);
            if (onDelete) {
                onDelete(_id); // Elimina el usuario de la lista de usuarios
            }
            console.log("Usuario eliminado con éxito");
        } catch (error) {
            console.error("Error al eliminar usuario:", error);
        }
    };

    return (
        <div className="col">
            <div className="card mx-auto mb-3">
                <div className="card-header">
                    <h3 className="card-title">{userData.firstName} {userData.lastName}</h3>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col">
                            <label className="card-text text-start">Apellido: {userData.lastName}</label>
                            <ul className="list-group list-group-flush">
                                <li className="list-pub list-group-item">Email: {userData.email}</li>
                                <li className="list-pub list-group-item">Username: {userData.userName}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="card-footer">
                    <button className="space btn btn-primary" onClick={handleEditClick}>Editar <i className="fa-solid fa-pen"></i></button>
                    <button className="btn btn-danger" onClick={handleDelete}>Eliminar <i className="fa-solid fa-trash"></i></button>
                </div>
            </div>
            {editing && (
                <div className="modal" style={{ display: "block" }}>
                    <div className="modal-content">
                        <span className="close" onClick={handleCloseModal}><i class="fa-solid fa-xmark"></i></span>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="firstName">Nombre:</label>
                                <input type="text" name="firstName" id="firstName" value={formData.firstName} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName">Apellido:</label>
                                <input type="text" name="lastName" id="lastName" value={formData.lastName} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="userName">Username:</label>
                                <input type="text" name="userName" id="userName" value={formData.userName} onChange={handleChange} />
                            </div>
                            <button type="submit" className="btn btn-warning">Guardar cambios</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UsersInfo;
