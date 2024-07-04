import React from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export const ModalCard = ({ isOpen, toggle, pelicula }) => {
    const convertirDatosaImagen = (pelicula) => {
        if (!pelicula || !pelicula.imagen) {
            return '';
        }
        const { extension, value } = pelicula.imagen;
        const urlImagen = `data:image/${extension};base64,${value}`;
        return urlImagen;
    };

    const urlImagenSrcM = convertirDatosaImagen(pelicula);


    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}> <h1>{pelicula.titles}</h1></ModalHeader>
            <ModalBody>
                <div className="card-header">
                    <img src={urlImagenSrcM} className="card-img-top" style={{ width: "100%", height: "100%"  }} />
                </div>
                <p>{pelicula.description}</p>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={toggle}>Cerrar</Button>
            </ModalFooter>
        </Modal>
    );


};

