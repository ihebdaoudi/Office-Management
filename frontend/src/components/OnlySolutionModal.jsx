import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

const OnlySolutionModal = ({ selectedTicket, fetchTickets }) => {
    const [solution, setSolution] = useState("")

    useEffect(() => {
        selectedTicket && setSolution(selectedTicket.solution)
    }, [selectedTicket])

 
    return (
        <div className="modal fade" id="onlysolution" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{selectedTicket ? selectedTicket.title : ""}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => { setSolution("") }}></button>
                    </div>
                    <div className="modal-body">
                        <span style={{ fontSize: "20px", fontWeight: "500" }}>Solution :</span>
                        <textarea style={{ width: "100%", height: "200px" }} disabled value={solution} onChange={(e) => { setSolution(e.target.value) }} />

                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OnlySolutionModal