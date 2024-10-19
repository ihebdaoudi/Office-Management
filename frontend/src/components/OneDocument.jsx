import React from 'react'

const OneDocument = ({ oneDoc }) => {
    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = `http://localhost:3000/${oneDoc.filePath}`; // Adjust the path based on your server setup
        link.download = oneDoc.name; // The name for the downloaded file
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    return (
        <div className="card" style={{ width: "18rem", marginBottom: "20px", marginLeft: "15px", height: "300px" }}>
            <img src="https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/09/ff/46/09ff46b0-348e-093e-f5c8-b7c357b46509/ReleaseAppIcon-0-0-1x_U007emarketing-0-7-0-85-220.png/1200x630wa.png" className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{oneDoc.name}</h5>
                <p className="card-text" style={{ marginBottom: "10px" }}>{oneDoc.description}</p>
                <span style={{ cursor: "pointer" }} id='dowlaoad-click' onClick={handleDownload}>Voir le Document</span>
            </div>
        </div>
    )
}

export default OneDocument