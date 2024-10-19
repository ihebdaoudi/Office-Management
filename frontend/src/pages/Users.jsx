import axios from 'axios'
import React, { useEffect, useState } from 'react'
import OneUser from '../components/OneUser'
import ModalAddMember from '../components/ModalAddMember'
import { Toaster } from 'sonner'

const Users = () => {
  const [users, setUsers] = useState([])

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/user/")
      setUsers(res.data);

    } catch (error) {
      console.log(error);

    }
  }
  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div>
      <ModalAddMember fetchUsers={fetchUsers}/>
      <Toaster richColors />
      <div style={{ marginBottom: "40px" }}>
        <h1 >List des Utilisateur</h1>
        <div className='assets-header'>
          <div style={{ display: "flex" }}>
            <div style={{ position: "relative" }}>
              <input type="text" placeholder='recherche' style={{ marginRight: "20px", padding: "5px 10px", width: "300px" }}  />
              <i className="fa-solid fa-magnifying-glass" id='searchicon' />
            </div>
          </div>
          <button data-bs-toggle="modal" data-bs-target="#adduserModal">Ajouter un nouveau Member</button>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #eee", textAlign: "left", marginBottom: "20px", paddingBottom: "10px", fontWeight: "bold" }}>
        <div style={{ width: "200px" }} >
          <span>Nom du utilisateur</span>
        </div>
        <span style={{ width: "200px" }}>Email</span>
        <span style={{ width: "200px" }}>Membre du </span>
        <span style={{ width: "200px" }}>Role</span>
        <span style={{ width: "100px" }}></span>
        <span style={{ width: "100px" }}></span>
      </div>
      {
        users.map((user) => {
          return <OneUser key={user._id} user={user} fetchUsers={fetchUsers} />
        })
      }


    </div>
  )
}

export default Users