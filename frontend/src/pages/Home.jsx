import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'

const Home = () => {
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
    const fetchdata = async () => {
        try {
            const res = await axios.get('http://localhost:3000/dashboard')
            console.log(res);
            setData(res.data)
            setLoading(false)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchdata()
        console.log("data", data);
    }, [])

    return (loading ?
        (
            <div style={{height:"80vh",display:"flex",justifyContent:"center",alignItems:"center"}}>
                <div className="spinner-border text-success" role="status" style={{width:"200px",height:"200px"}} >
                    <span className="visually-hidden">Loading...</span>
                </div >
            </div>
        )
        : <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", width: "85%", marginLeft: "auto", marginRight: "auto", marginTop: "150px" }}>
            <div className="oneCard" style={{ background: "#F4D1D0", color: "#C82F39" }}>
                <div >
                    <span>{data.assets}</span>
                    <i className="fa-solid fa-computer"></i>
                </div>
                <p>Ordinateurs</p>
            </div>

            <div className="oneCard" style={{ background: "#D1F1A9", color: "#71B11C" }}>
                <div >
                    <span>{data.documents}</span>
                    <i className="fa-solid fa-code"></i>
                </div>
                <p>Applications</p>
            </div>
            <div className="oneCard" style={{ background: "#C8DAE3", color: "#487C97" }}>
                <div >
                    <span>{data.users}</span>
                    <i className="fa-solid fa-user"></i>
                </div>
                <p>Utilisateurs</p>
            </div>
            <div className="oneCard" style={{ background: "#F7D79C", color: "#B67F0B" }}>
                <div >
                    <span>{data.tickets}</span>
                    <i className="fa-solid fa-ticket"></i>
                </div>
                <p>Reclamations</p>
            </div>
            <div className="oneCard" style={{ background: "#DC6E6E", color: "#69180F" }}>
                <div >
                    <span>{data.resolvedTickets}</span>
                    <i className="fa-solid fa-computer"></i>
                </div>
                <p>Reclamations resolu</p>
            </div>
            <div className="oneCard" style={{ background: "#F4D1D0", color: "#C82F39" }}>
                <div >
                    <span>{data.unresolvedTickets}</span>
                    <i className="fa-solid fa-computer"></i>
                </div>
                <p>Reclamations no resolu</p>
            </div>
            <div className="oneCard" style={{ background: "#9CC06B", color: "#2A481A" }}>
                <div >
                    <span>{data.tech}</span>
                    <i className="fa-solid fa-computer"></i>
                </div>
                <p>Techniciens</p>
            </div>
            <div className="oneCard" style={{ background: "#9FCEC3", color: "#3B695C" }}>
                <div >
                    <span>{data.normal}</span>
                    <i className="fa-solid fa-computer"></i>
                </div>
                <p>Agents</p>
            </div>
        </div>)



}

export default Home