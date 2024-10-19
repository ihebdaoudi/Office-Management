import React, { useEffect, useState } from 'react'
import OneTikcet from '../components/OneTikcet'
import axios from 'axios'
import SolutionModal from '../components/SolutionModal'
import { Toaster, toast } from 'sonner'
const Tickets = () => {
  const [search, setSearch] = useState('')
  const [tickets, setTickets] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [isResolved, setIsResolved] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState(null)

  const fetchTickets = async () => {
    try {
      const res = await axios.post("http://localhost:3000/ticket/getAll", { query:search, isOpen: isOpen, isResolved: isResolved })
      console.log(res.data);

      setTickets(res.data);

    } catch (error) {
      console.log(error);

    }
  }
  useEffect(() => {
    fetchTickets()
  }, [])
  useEffect(() => {
    fetchTickets()
  }, [search,isOpen, isResolved])
  return (
    <div>
      <Toaster richColors />
      <SolutionModal selectedTicket={selectedTicket} fetchTickets={fetchTickets} />
      <h1>Liste des Réclamations</h1>
      <div className='assets-header'>
        <div style={{ display: "flex" }}>
          <div style={{ position: "relative" }}>
            <input type="text" placeholder='recherche' style={{ marginRight: "20px", padding: "5px 10px", width: "300px" }} onChange={(e) => { setSearch(e.target.value) }} />
            <i className="fa-solid fa-magnifying-glass" id='searchicon' />
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <div >
            <input type="checkbox"
              className='checks'
              onChange={(e) => { console.log(e.target.checked); e.target.checked === true ? setIsOpen(e.target.checked) : setIsOpen(null) }}
              style={{ marginRight: "20px" }} />

            <span style={{ fontSize: "20px" }}>déja Ouverte</span>

          </div>

          <div style={{ marginLeft: "20px" }}>

            <input type="checkbox"
              className='checks'
              onChange={(e) => { console.log(e.target.checked); e.target.checked === true ? setIsResolved(e.target.checked) : setIsResolved(null) }}
              style={{ marginRight: "20px" }} />
            <span style={{ fontSize: "20px" }}>déja résolue</span>

          </div>

        </div>
      </div>
      {
        tickets.map((ticket) => {
          return <OneTikcet key={ticket._id} ticket={ticket} setSelectedTicket={setSelectedTicket} fetchTickets={fetchTickets} />
        })
      }

    </div>
  )
}

export default Tickets