import React from 'react'

const Onefromlist = ({ oneuser ,handleAddUser }) => {
  
    return (
        <li key={oneuser._id} className="list-group-item" style={{ display: "flex", justifyContent: "space-between",border:"1px solid #eee",marginBottom:"10px"}} onClick={()=>{handleAddUser(oneuser._id)}}
        >
            <label className="form-check-label stretched-link" style={{marginLeft:"10px"}} >
                {oneuser.fullName}
            </label>
                <i className="fa-solid fa-plus" style={{ color: "green", background: "#eee", padding: "5px"}}  onClick={()=>{console.log("fee")}}></i>
        </li>
    )
}

export default Onefromlist