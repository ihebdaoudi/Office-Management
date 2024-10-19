import React from 'react'
import '../styles/assets.css'
import AddApplicationModal from '../components/AddApplicationModal'
import OneApp from '../components/OneApp'
import { useEffect, useState } from 'react'
import axios from 'axios'
const Application = () => {
  const [apps, setApps] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/user/")
      setUsers(res.data);
      setLoading(false)
    } catch (error) {
      console.log(error);

    }
  }
  const fetchApps = async () => {
    try {
      const res = await axios.get('http://localhost:3000/softwere');
      setApps(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchApps();
    fetchUsers();
  }, []);

  return (
    <div>
      <AddApplicationModal fetchApps={fetchApps} />
      <h1>List des Applications</h1>
      <div className='assets-header'>
        <div style={{ display: "flex" }}>
          <div style={{ position: "relative" }}>
            <input type="text" placeholder='recherche' onChange={(e) => { setSearch(e.target.value) }} style={{ marginRight: "20px", padding: "5px 10px", width: "300px" }} />
            <i className="fa-solid fa-magnifying-glass" id='searchicon' />
          </div>
        </div>
        <button data-bs-toggle="modal" data-bs-target="#AddApp" >Ajouter une nouvelle Application </button>
      </div>


      <div className='oneApp' >

        <span>Nom</span>
        <span>version</span>
        <span>Createur</span>
        <span>Editer</span>
        <span>Supprimer</span>
        <span>Utilisateur</span>
      </div >


      <div>

        {
          loading ?
            <div style={{ height: "80vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <div className="spinner-border text-success" role="status" style={{ width: "200px", height: "200px" }} >
                <span className="visually-hidden">Loading...</span>
              </div >
            </div> :
            apps.map((oneApp) => {
              return <OneApp key={oneApp._id} oneApp={oneApp} fetchApps={fetchApps} users={users} fetchUsers={fetchUsers} />
            })

        }

      </div>



    </div>
  )
}



export default Application