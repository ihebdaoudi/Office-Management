import '../styles/assets.css'
import AddAssetModal from '../components/AddAssetModal'
import axios from 'axios'
import { useEffect, useState } from 'react'
import OneAsset from '../components/OneAsset'
import EditAsset from '../components/EditAsset'
const Assets = () => {
  const [assets, setAssets] = useState([])
  const [selectedAsset, setSelectedAsset] = useState(null)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  console.log("searchh", search);

  const fetchAssets = async () => {
    try {
      const response = await axios.get('http://localhost:3000/assets')
      setAssets(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchAssets()
  }, [])

  const hundleSearch = async () => {
    try {
      const response = await axios.post(`http://localhost:3000/assets/search`, { query: search })
      setAssets(response.data)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    hundleSearch()
  }, [search])
  return (
    <div>
      <AddAssetModal fetchAssets={fetchAssets} />
      <EditAsset selectedAsset={selectedAsset} fetchAssets={fetchAssets} />

      <h1>List des Materiaux</h1>
      <div className='assets-header'>
        <div style={{ display: "flex" }}>
          <div style={{ position: "relative" }}>
            <input type="text" placeholder='recherche' onChange={(e) => { setSearch(e.target.value) }} style={{ marginRight: "20px", padding: "5px 10px", width: "300px" }} />
            <i className="fa-solid fa-magnifying-glass" id='searchicon' />
          </div>
        </div>
        <button data-bs-toggle="modal" data-bs-target="#exampleModal">Ajouter un nouveau Materiel</button>
      </div>
      {
            loading ?
              <div style={{ height: "80vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <div className="spinner-border text-success" role="status" style={{ width: "200px", height: "200px" }} >
                  <span className="visually-hidden">Loading...</span>
                </div >
              </div> :
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Nom</th>
            <th scope="col">categorie</th>
            <th scope="col">modele</th>
            <th scope="col">marque</th>
            <th scope="col">num serie</th>
            <th scope="col">date d'achat</th>
            <th scope="col">location</th>
            <th scope="col">Editer</th>
            <th scope="col">Supprimer</th>
          </tr>
        </thead>
        <tbody>
        

            {  assets.map((asset) => {
                return <OneAsset asset={asset} key={asset._id} setSelectedAsset={setSelectedAsset} fetchAssets={fetchAssets} />
              })}
         
        </tbody>
      </table> 
      }
    </div>
  )
}

export default Assets