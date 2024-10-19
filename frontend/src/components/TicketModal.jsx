import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'sonner'

const TicketModal = ({ fetchTickets }) => {

    const [description, setDescription] = useState('')
    const [title, setTitle] = useState('')

    const handleSaveTicket = async () => {
        if (description === '' || title === '') {
            return toast.error('veuillez remplir tous les champs')
        }
        try {
            await axios.post('http://localhost:3000/ticket/', { title, description, sender: localStorage.getItem('userid') })
            toast.success('Ticket ajouté avec succès')
            setDescription('')
            setTitle('')
            fetchTickets()
        } catch (error) {
            console.log(error);

        }
    }

    return (
        <div className="modal fade" id="request" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body addModal">
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com" value={title} onChange={(e) => { setTitle(e.target.value) }} />
                            <label htmlFor="floatingInput">Titre du problem</label>
                        </div>
                        <div className="form-floating">
                            <textarea className="form-control" placeholder="Expliquer votre probleme bravement" value={description} onChange={(e) => { setDescription(e.target.value) }} id="floatingTextarea2" style={{ height: "100px" }} />
                            <label htmlFor="floatingTextarea2">Expliquer votre probleme bravement</label>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-success" onClick={() => { handleSaveTicket() }}>Envoyer</button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default TicketModal