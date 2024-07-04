import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin,faSquareWhatsapp} from '@fortawesome/free-brands-svg-icons'
import img from '../assets/imagen.png'
export const Footer = () => {
  return (
    <footer className='footer'>
      <div className='pie-1'>
        <div className='box'>
          <figure>
            <img src={img} />
          </figure>
        </div>

        <div className='box'>
          <h2>SOBRE MI</h2>
          <p>Soy un programador junior con una sólida base en programación que comenzó en la secundaria y se ha fortalecido durante más de tres años de estudio continuo. Actualmente, estoy cursando una licenciatura en informática en la universidad, lo que me permite ampliar y profundizar mis conocimientos en el campo. Busco una oportunidad de trabajo como programador junior para aplicar y expandir mis habilidades en un entorno profesional.</p>
        </div>
        <div className="box">
          <div className='red-social'>
            <h2>CONTACTOS </h2>
            <a href='https://www.linkedin.com/in/matias-achucarro-a94235233/' target='_blank' >LinkedIn  <FontAwesomeIcon icon={faLinkedin} /></a>

            <a href='https://w.app/Tkpry3' target='_blank' >Whatsapp <FontAwesomeIcon icon={faSquareWhatsapp} /></a>
          </div>
        </div>
      </div>
      <div className='pie-2'>&copy;  <b>Matias Achucarro</b> </div>
    </footer>
  )
}
