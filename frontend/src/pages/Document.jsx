import React, { useEffect, useState } from 'react'
import AddDocumentModal from '../components/AddDocumentModal'
import OneDocument from '../components/OneDocument'
import axios from 'axios'

const Document = () => {
    const [documents, setDocuments] = useState([])
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(true)
    const fetchDocuments = async () => {
        try {
            const res = await axios.get("http://localhost:3000/documents/")
            setDocuments(res.data);

        } catch (error) {
            console.log(error);

        }
    }
    const hundleSearch = async () => {
        console.log(search);

        try {
            const response = await axios.post(`http://localhost:3000/documents/search/`, { query: search })
            setDocuments(response.data);
            setLoading(false)
            // console.log(response.data);

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        hundleSearch()
    }, [search])

    useEffect(() => {
        fetchDocuments()
    }, [])

    return (
        <div>
            <AddDocumentModal fetchDocuments={fetchDocuments} />
            <h1>List des Documents</h1>
            <div className='assets-header'>
                <div style={{ display: "flex" }}>
                    <div style={{ position: "relative" }}>
                        <input type="text" placeholder='recherche' style={{ marginRight: "20px", padding: "5px 10px", width: "300px" }} onChange={(e) => { setSearch(e.target.value) }} />
                        <i className="fa-solid fa-magnifying-glass" id='searchicon' />
                    </div>
                </div>
                <button data-bs-toggle="modal" data-bs-target="#addDocument">Ajouter un nouveau Document</button>
            </div> {
                loading ?
                    <div style={{ height: "80vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <div className="spinner-border text-success" role="status" style={{ width: "200px", height: "200px" }} >
                            <span className="visually-hidden">Loading...</span>
                        </div >
                    </div> :
                    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "left" }}>

                        {documents.map((oneDoc) => {
                            return <OneDocument key={oneDoc._id} oneDoc={oneDoc} />
                        })
                        }

                    </div>
            }





        </div>
    )
}

export default Document