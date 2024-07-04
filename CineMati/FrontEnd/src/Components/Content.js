import React from 'react'
import Pelicula from './Pelicula'
export const Content = ({ pelicula, handleShowDetail, onEditMovie, deletePost }) => {

  return (
    <section id='content' className='content'>
      {pelicula.map((pelicula) =>
        <Pelicula
          key={pelicula.id}
          id={pelicula.id}
          titles={pelicula.titles}
          description={pelicula.description}
          imagen={pelicula.imagen}
          deletePost={deletePost}
          onEditMovie={() => onEditMovie(pelicula)}
          onShowDetail={() => handleShowDetail(pelicula)}
        />
      )}</section>
  )
}
