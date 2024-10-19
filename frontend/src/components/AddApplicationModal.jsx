import axios from 'axios'
import React from 'react'
import { useState } from 'react'

const AddApplicationModal = ({fetchApps}) => {
    const [nom,setNom]=useState('')
    const [version,setVersion]=useState('')
    const [createur,setCreateur]=useState('')
    const handleADDSoft = async () =>{
        try {
            const res = await axios.post('http://localhost:3000/softwere',{name:nom,version,publisher:createur}) 
            console.log(res)
            fetchApps()
        } catch (error) {
            console.log(error);
        }

    }
  return (
    <div className="modal fade" id="AddApp" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body addModal">
            <input type="text" placeholder='Nom' onChange={(e)=>{setNom(e.target.value)}}/>
            <input type="text" placeholder='Version' onChange={(e)=>{setVersion(e.target.value)}}  />
            <input type="text" placeholder='Createur' onChange={(e)=>{setCreateur(e.target.value)}}  />
            
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" className="btn btn-primary" onClick={handleADDSoft}>Save changes</button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default AddApplicationModal
