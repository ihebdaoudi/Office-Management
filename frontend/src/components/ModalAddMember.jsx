import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'sonner'

const ModalAddMember = ({fetchUsers}) => {
    const [data, setData] = useState({
        fullName: '',
        email: '',
        password: '',
        role: ''
    })
    const handleSaveMember = async () => {
        if (data.name === '' || data.email === '' || data.password === '' || data.role === '') {
            return toast.error('veuillez remplir tous les champs')
        }
        try {
            await axios.post('http://localhost:3000/user/register', data)
            toast.success('Membre ajouté avec succès')
            setData({
                name: '',
                email: '',
                password: '',
                role: ''
            })
            fetchUsers()
        } catch (error) {
            console.log(error);

        }
    }
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    console.log(data);
    
    return (
        <div className="modal fade" id="adduserModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Ajouter un Memeber</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body addModal">
                        <input type="text" name='fullName' value={data.fullName} placeholder='nom complete d utilisateur' onChange={(e) => { handleChange(e) }} />
                        <input type="email" name='email' value={data.email} placeholder='Email' onChange={(e) => { handleChange(e) }} />
                        <input type="text" name='password' value={data.password} placeholder='Mot de passe' onChange={(e) => { handleChange(e) }} />
                        <div>
                            <select name="role" id='select-add-modal' value={data.role} onChange={(e) => { handleChange(e) }} >
                                <option value="">Role</option>
                                <option value="normal">Membre</option>
                                <option value="tech">Technicien</option>
                            </select>
                        </div>

                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={handleSaveMember}>Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalAddMember