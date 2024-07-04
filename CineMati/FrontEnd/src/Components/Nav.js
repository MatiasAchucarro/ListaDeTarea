import React from 'react'
import { Buscador } from './Buscador';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { Lupa } from '../assets/Lupa'

export const Nav = ({ setOpenModal, search, searcher  }) => {
  return (
    <nav className='nav'>
      <div className='agregar-pelicula'>
        <button className='btn btn-info' onClick={() => { setOpenModal(true); }}>  Agregar Peliculas  <FontAwesomeIcon icon={faAdd} /> </button>
      </div>
      <div class="group">
        <Lupa />
        <input value={search} onChange={searcher} placeholder="Buscar" type="search" className="input" />
      </div>
    </nav>
  )
}
