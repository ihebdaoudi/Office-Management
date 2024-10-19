import axios from 'axios'
import { useEffect, useState } from 'react'
import { Toaster, toast } from 'sonner'

const AddDocumentModal = ({ fetchDocuments }) => {
    const [data, setData] = useState({
        name: '',
        description: '',
        filePath: null
    });

    const handleAddDocument = async () => {
        console.log(data, "from add");

        if (data.name === '' || data.description === '') {
            toast.error('Veuillez remplir tous les champs');
            return;
        }

        // Create a FormData object
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('filePath', data.filePath); // 'pdf' should match the field name in Multer

        try {
            await axios.post('http://localhost:3000/documents/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setData({
                name: '',
                description: '',
                filePath: null
            });
            fetchDocuments()
            toast.success('Document a été ajouté avec succès');
        } catch (error) {
            console.log(error);
            toast.error('Problème lors de l\'ajout du document');
        }
    };

    // Example of how to handle file input changes
    const handleFileChange = (event) => {
        setData({ ...data, filePath: event.target.files[0] });
    };

    // Example of how to handle text input changes
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setData({ ...data, [name]: value });
    };
    console.log(data);

    return (
        <div className="modal fade" id="addDocument" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <Toaster />
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Ajouter un Document</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body addModal" style={{ display: "flex", flexDirection: "column" }}>
                        <input type="text" name='name' placeholder='titre du document' onChange={(e) => { handleInputChange(e) }} />
                        <input type="text" name='description' placeholder='description' onChange={(e) => { handleInputChange(e) }} />
                        <input type="file" accept='.pdf' onChange={(e) => { handleFileChange(e) }} />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={handleAddDocument}>Save changes</button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default AddDocumentModal