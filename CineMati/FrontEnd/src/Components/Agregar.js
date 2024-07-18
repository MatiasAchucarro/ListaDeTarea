import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useForm } from 'react-hook-form';
import { AgregarImagen } from '../assets/AgregarImagen';



export default function AddPost({ closeModal, addPost }) {

    const [titles, setTitles] = useState('');
    const [description, setDescription] = useState('');
    const [imagen, setImagen] = useState();
    const [imagePreview, setImagePreview] = useState(null);
    const [errors, setErrors] = useState({});

    const fileToBase64 = (imagen, onLoadendedCallback) => {
        const reader = new FileReader();
        const extension = imagen.name.split('.').pop();
        const name = imagen.name;
        reader.onloadend = function () {
            onLoadendedCallback({
                value: reader.result.split(',')[1],
                extension,
                name
            });
        }

        reader.readAsDataURL(imagen);
    }



    const handleImageChange = (e) => {

        fileToBase64(e.target.files[0], (img) => setImagen(img));
    }
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        handleImageChange(e);

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    }
    const validate = () => {
        const newErrors = {};
        if (!titles) newErrors.titles = 'El título es obligatorio';
        if (!imagen) newErrors.imagen = 'La imagen es obligatoria';
        return newErrors;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            addPost(titles, description, imagen);
            setTitles('');
            setDescription('');
            setImagen();
            closeModal();
        }
    };


    return (
        <div >
            <Modal isOpen >
                <ModalHeader style={{ display: 'block' }}>
                    <Button className='btn btn-danger' style={{ float: 'right' }} onClick={() => closeModal(false)}>x</Button>
                    <br />
                    <h1> Añadir Pelicula</h1>
                </ModalHeader>
                <ModalBody>
                    <form className='entradas' onSubmit={handleSubmit}>
                        <div className='form-group'>

                            <label className="custum-file-upload" for="file">
                                <div className="icon">
                                    {!imagePreview ? (<AgregarImagen />
                                    ) : (
                                        <img src={imagePreview} alt="Preview" />
                                    )}
                                </div>
                                {!imagePreview && (
                                    <div className="text">
                                        <span>Subir Imagen</span>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    id="file"
                                    accept="image/*"
                                    onChange={handleImageUpload} />
                            </label>

                            {errors.imagen && <span style={{ color: 'red' }}>{errors.imagen}</span>}

                            <br />
                            <label className='titles'>Nombre de la Pelicula</label>
                            <input
                                className='form-control'
                                type='text' name='titles'
                                value={titles}
                                onChange={(e) => setTitles(e.target.value)}
                            />
                            {errors.titles && <span style={{ color: 'red' }}>{errors.titles}</span>}
                            <br />
                            <label className='description'>Descripcion de la Pelicula</label>
                            <textarea
                                className='form-control'
                                type='text'
                                name='description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <br />


                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button type='submit' className='btn btn-success' onClick={handleSubmit} >Añadir</Button>
                    <Button className='btn btn-danger' onClick={() => closeModal(false)}>Cancelar</Button>
                </ModalFooter>
            </Modal>

        </div>
    )
}
