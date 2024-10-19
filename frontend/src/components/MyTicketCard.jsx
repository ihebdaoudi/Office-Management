import axios from 'axios';
import React from 'react'

const MyTicketCard = ({ ticket, setSelectedTicket, fetchTickets }) => {

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
                <span>{ticket.title}</span>
                <span> Du : {formattedDate}</span>
            </div>
            <div className="card-body">
                <p className="card-text">{ticket.description}</p>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    {ticket.isResolved ?
                        <button type="button" className="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#onlysolution" onClick={() => { setSelectedTicket(ticket); handleOpen() }}>
                            voir la solution
                        </button> :
                        <button type="button" className="btn btn-outline-secondary" disabled data-bs-toggle="modal" data-bs-target="#onlysolution" onClick={() => { setSelectedTicket(ticket); handleOpen() }}>
                            voir la solution
                        </button>}

                    <span style={{ fontSize: "20px" }}>Status : {ticket.isResolved ? "résolu" : ticket.isOpen && !ticket.isResolved ? "En cours de traitement " : "non ouverte"}</span>
                </div>
            </div>
        </div>
    )
}

export default MyTicketCard