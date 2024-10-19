import { useState } from 'react'
import '../styles/Login.css'
import bna from '../assets/BNA-Bank (1).jpg'
import axios from 'axios'
import { Toaster, toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

const Login = ({handleStorageChange}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const handleSubmit = async () => {
        try {
           const res = await axios.post('http://localhost:3000/user/login', { email, password })
           localStorage.setItem('userid', res.data.userId);
           localStorage.setItem('role', res.data.role);
           handleStorageChange()
            navigate("/home")
        } catch (error) {
            toast.error(error.response.data.message);

        }
    }

    return (
        <div className='login-container'>
            <Toaster richColors />
            <div className="cover">
                <img src={bna} alt="" />
            </div>
            <div className="login-inputs">
                <div className="login-subinputs">
                    <span style={{ marginBottom: "80px", fontSize: "50px", fontWeight: "500", letterSpacing: "2px", color: "#32b474" }}>s'identifier</span>
                    <input type="text" className='login-input' placeholder='saisir votre email' value={email} onChange={(e) => { setEmail(e.target.value) }} required />
                    <input type="password" className='login-input' placeholder='saisir votre mot de passe' value={password} onChange={(e) => { setPassword(e.target.value) }} required />
                    <button onClick={handleSubmit} >Login</button>
                </div>
            </div>
        </div>
    )
}

export default Login