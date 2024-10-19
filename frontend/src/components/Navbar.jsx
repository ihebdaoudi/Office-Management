import React, { useState } from 'react'
import logo from '../assets/logobna.png'
import avatar from '../assets/avatar.jpg'
import tech from "../assets/tech.jpg"
import '../styles/navbar.css'
import { useNavigate } from 'react-router-dom'
const Navbar = ({ userRole }) => {
    const navigate = useNavigate()
    const path = window.location.pathname
    const [show, setShow] = useState(false)
    console.log(path);

    const disconnect = () => {
        localStorage.removeItem('userid');
        localStorage.removeItem('role');
        navigate('/')
    }
    return (
        <div className='navbar'>
            <img id='thelogo' src={logo} alt="" onClick={()=>{navigate('/home')}} />
            <ul  className='ligadhakhalil'>
                <li className={path === "/home" ? "oneActiveNavigator" : "oneNavigator"} onClick={() => { navigate("/home") }}>Dashboard</li>
                <li className={path === "/assets" ? "oneActiveNavigator" : "oneNavigator"} onClick={() => { navigate("/assets") }} >Assets</li>

                {
                    userRole === "super_admin" ?
                        null
                        :
                        <li className={path === "/tickets" ? "oneActiveNavigator" : "oneNavigator"} onClick={() => { navigate("/tickets") }} >Reclamation</li>

                }

                {
                    userRole === "super_admin" ?
                        <li className={path === "/users" ? "oneActiveNavigator" : "oneNavigator"} onClick={() => { navigate("/users") }} >Utilisateurs</li>
                        :
                        null
                }

            </ul>
            <div style={{ position: "relative" }}>
                <img id='avatar' src={userRole === "tech" ? tech : avatar} alt="" onClick={() => { setShow(!show) }} />
                <button type="button" className="btn btn-outline-danger disconeect" style={show ? {} : { display: "none" }} onClick={() => { disconnect() }}>Deconnection</button>


            </div>
        </div>
    )
}

export default Navbar