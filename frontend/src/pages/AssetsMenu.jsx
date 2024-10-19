import React from 'react'
import { useNavigate } from 'react-router-dom'

const AssetsMenu = () => {
    const navigate = useNavigate()
    return (
        <div style={{ minHeight: "80vh" }}>
            <h1 style={{ textAlign: "center", fontSize: "60px", letterSpacing: "4px" }}>Assets Menu</h1>
            <div style={{ display: "flex", justifyContent: "space-around", height: "650px", alignItems: "center" }}>
                <div className="assetCard" onClick={() => { navigate("/assets/material") }}>
                    <div style={{ background: " #32b474", height: "80%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "90px", borderTopLeftRadius: "20px", borderTopRightRadius: "20px", color: "white" }}>
                        <i className="fa-solid fa-laptop"></i>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: "40px", color: " #32b474", padding: "5px", fontWeight: "500" }}>
                        <p >Materiel</p>
                    </div>
                </div>
                <div className="assetCard" onClick={() => { navigate("/assets/app") }}>
                    <div style={{ background: " #32b474", height: "80%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "90px", borderTopLeftRadius: "20px", borderTopRightRadius: "20px", color: "white" }}>
                        <i className="fa-solid fa-code"></i>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: "40px", color: " #32b474", padding: "5px", fontWeight: "500" }}>
                        <p>Application</p>
                    </div>
                </div>
                <div className="assetCard" onClick={() => { navigate("/assets/document") }}>
                    <div style={{ background: " #32b474", height: "80%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "90px", borderTopLeftRadius: "20px", borderTopRightRadius: "20px", color: "white" }}>
                        <i className="fa-solid fa-file"></i>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: "40px", color: " #32b474", padding: "5px", fontWeight: "500" }}>
                        <p>Document</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AssetsMenu