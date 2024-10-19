import axios from 'axios'
import { useEffect, useState } from 'react'
import { Toaster, toast } from 'sonner'

const EditAsset = ({ fetchAssets, selectedAsset }) => {
    const [isOpened, setIsOpened] = useState(false)
    const [locations, setLocations] = useState([])


    const [data, setData] = useState({
        title: '',
        description: '',
        categorie: '',
        model: '',
        brand: '',
        serialNumber: '',
        purchaseDate: '',
        location: ''
    })
    useEffect(() => {
        console.log(selectedAsset);
        if(selectedAsset){
            setData({ ...selectedAsset, purchaseDate: selectedAsset.purchaseDate.split('T')[0] })
        }
    }, [selectedAsset])
    const [locationData, setLocationData] = useState({
        name: '',
        fullAddress: '',
        country: '',
        zipcode: ''
    })


    const getLocations = async () => {
        try {
            const response = await axios.get('http://localhost:3000/location/')
            setLocations(response.data);

        } catch (error) {
            console.log(error);
        }
    }

    const handlechangeLocation = (e) => {
        setLocationData({ ...locationData, [e.target.name]: e.target.value })
    }

    const handleAddLocation = async () => {
        if (locationData.name === '' || locationData.fullAddress === '' || locationData.country === '' || locationData.zipcode === '') {
            toast.error('veuillez remplir tous les champs du location')
            return
        }
        try {
            await axios.post('http://localhost:3000/location/', locationData)
            setIsOpened(false)
            getLocations()
            setLocationData({
                name: '',
                fullAddress: '',
                country: '',
                zipcode: ''
            })
            toast.success('Location a éte ajouter avec succes')
        } catch (error) {
            console.log(error);
            toast.error('probleme lors de l\'ajout de la location')
        }
    }

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleEditAsset = async () => {
        if (data.title === '' || data.description === '' || data.categorie === '' || data.model === '' || data.brand === '' || data.serialNumber === '' || data.purchaseDate === '' || data.location === '') {
            toast.error('veuillez remplir tous les champs')
            return
        }
        try {
            await axios.put(`http://localhost:3000/assets/${selectedAsset._id}`,data)
            toast.success('Asset est mise a jour avec succes')
            fetchAssets()
        } catch (error) {
            console.log(error);
            toast.error('probleme lors de l\'Modification de la Asset')
        }
    }

  
    useEffect(() => {
        getLocations()
    }, [])



    return (
        <div className="modal fade" id="editmodal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <Toaster />
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Modifer le Materiel</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body addModal" style={{ display: "flex", flexDirection: "column" }}>
                        <input type="text" name='title' value={data.title} placeholder='Title' onChange={(e) => { handleChange(e) }} />
                        <textarea name='description' value={data.description} placeholder='Description' onChange={(e) => { handleChange(e) }}></textarea>
                        <input type="text" name='categorie' value={data.categorie} placeholder='Categorie' onChange={(e) => { handleChange(e) }} />
                        <input type="text" name='model' value={data.model} placeholder='Model' onChange={(e) => { handleChange(e) }} />
                        <input type="text" name='brand' value={data.brand} placeholder='Marque' onChange={(e) => { handleChange(e) }} />
                        <input type="text" name='serialNumber' value={data.serialNumber} placeholder='Numero de serie' onChange={(e) => { handleChange(e) }} />
                        <div style={{ display: "flex", alignItems: "center", paddingLeft: "5px" }} onChange={(e) => { handleChange(e) }}>
                            <span>date d'achat</span>
                            <input type="date" name='purchaseDate' value={data.purchaseDate} placeholder='' />

                        </div>
                        <div>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <select id='select-add-modal' name='location' style={{ marginRight: "10px" }} onChange={(e) => { handleChange(e) }}>
                                    <option value="">location</option>
                                    {locations.map((location) => {
                                        return <option key={location._id} value={data.location._id}>{location.name}</option>
                                    })}
                                </select>
                                <button className="btn btn-success" onClick={() => { setIsOpened(!isOpened) }}>
                                    {isOpened ? "Fermer" : "Ajouter"}
                                </button>
                            </div>
                            <div style={isOpened ? { display: "block" } : { display: "none" }}>
                                <div style={{ display: "flex" }}>
                                    <input type="text" name='name' value={locationData.name} placeholder='Nom du Bureau' style={{ marginRight: "10px" }} onChange={(e) => { handlechangeLocation(e) }} />
                                    <input type="text" name="fullAddress" value={locationData.fullAddress} placeholder='adresse complete' onChange={(e) => { handlechangeLocation(e) }} />
                                </div>
                                <div style={{ display: "flex" }}>
                                    <input type="text" name='country' value={locationData.country} placeholder='Gouvernorat' style={{ marginRight: "10px" }} onChange={(e) => { handlechangeLocation(e) }} />
                                    <input type="Number" name='zipcode' value={locationData.zipcode} placeholder='code postale' onChange={(e) => { handlechangeLocation(e) }} />
                                </div>
                                <div style={{ display: "flex" }}>
                                    <button className="btn btn-outline-secondary" onClick={() => { handleAddLocation() }} style={{ width: "100%" }}>
                                        Ajouter la location
                                    </button>
                                </div>

                            </div>

                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" >Close</button>
                        <button type="button" className="btn btn-success" onClick={handleEditAsset}>Editer l'Asset </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditAsset