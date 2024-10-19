import React, { useState } from 'react'
import avatar from '../assets/avatar.jpg'
import tech from "../assets/tech.jpg"
import axios from 'axios';
import { toast } from 'sonner';
const OneUser = ({ user, fetchUsers }) => {
    const date = new Date(user.createdAt);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    const [role, setRole] = useState(user.role)

    const handleupdateRole = async (role) => {
        try {
            await axios.put(`http://localhost:3000/user/${user._id}`, { role })
            setRole(role)
            fetchUsers()
            toast.success('Role est modifier avec succes')
        } catch (error) {
            console.log(error);
        }
    }
    const handleDeleteUser = async () => {
        try {
            await axios.delete(`http://localhost:3000/user/${user._id}`)
            fetchUsers()
            toast.success('Utilisateur est supprimer avec succes')
        } catch (error) {
            console.log(error);}}
    const handleDesactivateUser = async () => {
        try {
            await axios.put(`http://localhost:3000/user/archive/${user._id}`)
            fetchUsers()
            toast.success('Utilisateur est desactiver avec succes')
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #eee", textAlign: "left", marginBottom: "20px", paddingBottom: "10px" }}>
            <div style={{ width: "200px" }} >
                <img src={user.role === "tech" ? tech : avatar} alt="" style={{ width: "50px", borderRadius: "50%", marginRight: "20px" }} />
                <span>{user.fullName}</span>
            </div>
            <span style={{ width: "200px" }}>{user.email}</span>
            <span style={{ width: "200px" }}>{formattedDate}</span>
            <span style={{ width: "200px" }}>
                <div className="btn-group">
                    <button type="button" className="btn dropdown-toggle" style={{ width: "200px" }} data-bs-toggle="dropdown" aria-expanded="false">
                        {role === "tech" ? "technicien" : "membre"}
                    </button>
                    <ul className="dropdown-menu">
                        <li className="dropdown-item" onClick={() => { handleupdateRole("tech") }}>technicien</li>
                        <li className="dropdown-item" onClick={() => { handleupdateRole("normal") }}>membre</li>
                    </ul>
                </div>
            </span>
            <button type="button" className="btn btn-danger" style={{width:"100px"}} onClick={()=>{handleDeleteUser()}}><i className="fa-solid fa-trash"></i></button>
            {
                user.isArchived ? 
                <button type="button" className="btn btn-danger" style={{width:"100px"}} onClick={handleDesactivateUser}>Desactiver</button>
                 : <button type="button" className="btn btn-success" style={{width:"100px"}} onClick={handleDesactivateUser} >Activer</button>
            }

        </div>
    )
}

export default OneUser