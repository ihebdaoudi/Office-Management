import axios from 'axios';
import React from 'react'

const OneTikcet = ({ ticket, setSelectedTicket, fetchTickets }) => {

    const date = new Date(ticket.createdAt);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('fr-fr', options);


    const handleOpen = async () => {
        try {
            await axios.put(`http://localhost:3000/ticket/open/${ticket._id}`)
            fetchTickets()
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="card" style={{ marginBottom: "20px" }}>
            <div className="card-header" style={{ fontSize: "25px", display: "flex", justifyContent: "space-between", background: ticket.isOpen && ticket.isResolved ? "#A1DD70" : ticket.isOpen && !ticket.isResolved ? "#FFA27F" : "#19282F", color: "white" }}>
                <span> Reclamation de : {ticket.sender.fullName}</span>
                <span> Du : {formattedDate}</span>
            </div>
            <div className="card-body">
                <h5 className="card-title">{ticket.title}</h5>
                <p className="card-text">{ticket.description}</p>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    {ticket.isResolved ?
                        <button type="button" className="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#solution" onClick={() => { setSelectedTicket(ticket); handleOpen() }}>
                            Changer la solution
                        </button> :
                  ticket.isOpen && !ticket.isResolved ?
                    <button type="button" className="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#solution" onClick={() => { setSelectedTicket(ticket); handleOpen() }}>
                        envoyer la solution
                    </button> :

                    <button type="button" className="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#solution" onClick={() => { setSelectedTicket(ticket); handleOpen() }}>
                        ouvrir
                    </button>
                }
                  
                    <span style={{ fontSize: "20px" }}>status : {ticket.isResolved ? "resolver" : ticket.isOpen && !ticket.isResolved ? "ouverte" : "non ouverte"}</span>
                </div>
            </div>
        </div>
    )
}

export default OneTikcet