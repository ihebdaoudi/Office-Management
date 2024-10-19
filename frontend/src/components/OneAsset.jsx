import React from 'react'
import EditAsset from './EditAsset'
import axios from 'axios'
import { toast } from 'sonner'

const OneAsset = ({ asset, setSelectedAsset, fetchAssets }) => {
    const date = new Date(asset.purchaseDate);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);

    const handleDeleteAsset = async () => {
        try {
            await axios.delete(`http://localhost:3000/assets/${asset._id}`)
            toast.success('Asset est supprimer avec succes')
            fetchAssets()
        } catch (error) {
            console.log(error);
            toast.error('probleme lors de la suppression de la Asset')
        }
    }
    return (
        <tr key={asset.id}>
            <th scope="row">{asset.title}</th>
            <td>{asset.categorie}</td>
            <td>{asset.model}</td>
            <td>{asset.brand}</td>
            <td>{asset.serialNumber}</td>
            <td>{formattedDate}</td>
            <td>{asset.location.name}</td>
            <td style={{ textAlign: "center" }}> <button onClick={() => { setSelectedAsset(asset) }} style={{ background: "transparent", border: "none" }} data-bs-toggle="modal" data-bs-target="#editmodal" ><i className="fa-solid fa-pen-to-square" style={{ cursor: "pointer" }}></i></button> </td>
            <td style={{ textAlign: "center" }}><i className="fa-solid fa-trash" id='deleteAsset' style={{ cursor: "pointer" }} onClick={() => { handleDeleteAsset() }}></i></td>
        </tr>
    )
}

export default OneAsset