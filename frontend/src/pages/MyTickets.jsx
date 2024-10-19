import React, { useEffect, useState } from 'react'
import OneTikcet from '../components/OneTikcet'
import axios from 'axios'
import SolutionModal from '../components/SolutionModal'
import { Toaster, toast } from 'sonner'
import MyTicketCard from '../components/MyTicketCard'
import OnlySolutionModal from '../components/OnlySolutionModal'
import TicketModal from '../components/TicketModal'
const MyTickets = () => {
    const [search, setSearch] = useState('')
    const [tickets, setTickets] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [isResolved, setIsResolved] = useState(false)
    const [selectedTicket, setSelectedTicket] = useState(null)
const [loading, setLoading] = useState(true)
    const fetchTickets = async () => {
        try {
            const res = await axios.post("http://localhost:3000/ticket/getMyTickets", { query: search, isOpen: isOpen, isResolved: isResolved, userId: localStorage.getItem('userid') })
            console.log(res.data);

            setTickets(res.data);
            setLoading(false)
        } catch (error) {
            console.log(error);

        }
    }
    useEffect(() => {
        fetchTickets()
    }, [])
    useEffect(() => {
        fetchTickets()
    }, [search, isOpen, isResolved])
    return (
        <div>
            <Toaster richColors />
            <OnlySolutionModal selectedTicket={selectedTicket} fetchTickets={fetchTickets} />
            <TicketModal fetchTickets={fetchTickets} />
            <h1>Mes Réclamations</h1>
            <div className='' style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <div style={{ display: "flex" }}>
                    <div style={{ position: "relative" }}>
                        <input type="text" placeholder='recherche' style={{ marginRight: "20px", padding: "5px 10px", width: "300px" }} onChange={(e) => { setSearch(e.target.value) }} />
                        <i className="fa-solid fa-magnifying-glass" id='searchicon' />
                    </div>
                </div>
                <div style={{ display: "flex" }}>
                    <button type="button" className="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#request" >Crée une Reclamation</button>

                </div>
            </div>

            {
                loading ?
                <div style={{ height: "80vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <div className="spinner-border text-success" role="status" style={{ width: "200px", height: "200px" }} >
                        <span className="visually-hidden">Loading...</span>
                    </div >
                </div>:
                tickets.length === 0 ? <h1 style={{ textAlign: "center" }}>Aucune réclamation</h1> :
                    tickets.map((ticket) => {
                        return <MyTicketCard key={ticket._id} ticket={ticket} setSelectedTicket={setSelectedTicket} fetchTickets={fetchTickets} />
                    })
            }

        </div>
    )
}

export default MyTickets