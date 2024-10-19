import React, { useState } from 'react'
import axios from 'axios';
import { toast, Toaster } from 'sonner'
import Onefromlist from './Onefromlist';
const OneApp = ({ oneApp, fetchApps, users,fetchUsers }) => {
const [isOpened, setIsOpened] = useState(false);  

  const handleDeleteApp = async () => {
    try {
      await axios.delete(`http://localhost:3000/softwere/${oneApp._id}`);
      toast.success('Application supprimée avec succès');
      fetchApps(); // Refresh the list after deletion
    } catch (error) {
      console.log(error);
      toast.error('Problème lors de la suppression de l\'application');
    }
  };

  const handleAddUser = async (userId) => {
    try {
     
      await axios.put(`http://localhost:3000/softwere/${oneApp._id}/addUser`, { user: userId });
      toast.success('Utilisateur ajouté avec succès');
      fetchApps(); // Refresh the list after adding the user
    } catch (error) {
      console.log(error);
      toast.error('Problème lors de l\'ajout de l\'utilisateur');
    }
  }
  const handleRemoveUser = async (userId) => {
    console.log("userId", userId);
    
    try {
      await axios.put(`http://localhost:3000/softwere/${oneApp._id}/removeUser`, { user: userId });
      toast.success('Utilisateur supprimé avec succès');
      fetchApps(); // Refresh the list after removing the user
      fetchUsers()
    } catch (error) {
      console.log(error);
      toast.error('Problème lors de la suppression de l\'utilisateur');
  }}
  return (
    <div>
      <Toaster />

      <div style={{ display: "flex", justifyContent: "space-between" }} className='oneApp'>
        <span >{oneApp.name}</span> {/* Correct property name based on your schema */}
        <span>{oneApp.version}</span>
        <span>{oneApp.publisher}</span> {/* Correct property name based on your schema */}
        <span style={{}}><i class="fa-solid fa-pen-to-square"></i></span>
        <span style={{ textAlign: "left" }}>
          <i
            className="fa-solid fa-trash"
            id="deleteApp"
            style={{ cursor: "pointer" }}
            onClick={handleDeleteApp}
          ></i>
        </span>
        <button className="btn btn-secondary" type="button" data-bs-toggle="collapse" data-bs-target={`#collapseExample${oneApp._id}`} aria-expanded="false" aria-controls="collapseExample">
          List des utilisateurs
        </button>
      </div>
      <div className="collapse" id={`collapseExample${oneApp._id}`}>


        <div className="card card-body" >
          <div style={{ display: "flex", width: "100%", justifyContent: "space-between" }} >
            <ul className="list-group" style={{ width: "75%" }}>
              {
                oneApp.user ?
                  oneApp.user.map((oneuser) => {
                    return <div className="list-group-item" style={{ display: "flex", justifyContent: "space-between" }} key={oneuser._id}  onClick={() => { handleRemoveUser(oneuser._id)}}>

                      <label className="form-check-label stretched-link" htmlFor="firstCheckboxStretched"  style={{width:"100px"}}>{oneuser.fullName}</label>
                      <label className="form-check-label stretched-link" htmlFor="firstCheckboxStretched" style={{width:"100px"}}> {oneuser.role === "tech" ? "technicien" : "membre"}</label>
                      <label className="form-check-label stretched-link" htmlFor="firstCheckboxStretched">{oneuser.email}</label>

                      <i className="fa-solid fa-minus" style={{ color: "red", background: "#eee", padding: "5px" }} ></i>

                    </div>
                  }) : null
              }


            </ul>

            <div style={{ textAlign: "left", width: "20%" }}>
              <button className='btn btn-dark' style={{ width: "100%",marginBottom:"10px"}} onClick={()=>{setIsOpened(!isOpened)}} >Ajouter un utilisateur</button>
              <ul style={isOpened ? { height: "70px", overflowY: "scroll", width: "100%"}:{ height: "70px", overflowY: "scroll", width: "100%",display:"none" }}>  
                {users ?
                  users.filter(oneuser => !oneApp.user.some(appUser => appUser._id === oneuser._id))
                    .map((oneuser) => (
                      <Onefromlist oneuser={oneuser} handleAddUser={handleAddUser} />
                    ))
                  : null}

              </ul>
            </div>

          </div>
        </div>
      </div>

    </div>
  )
}

export default OneApp
