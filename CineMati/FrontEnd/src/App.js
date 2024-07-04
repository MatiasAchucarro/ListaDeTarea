
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Agregar from './Components/Agregar';
import Editar from './Components/Editar';

import { ModalCard } from './Components/ModalCard';
import { Header } from './Components/Header';
import { Nav } from './Components/Nav';
import { Content } from './Components/Content';
import { Footer } from './Components/Footer';

function App() {

  const [openModalE, setOpenModalE] = useState(false);
  const [posts, setPosts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [movieEdit, setMovieEdit] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [search, setSerch] = useState("");




  //Get
  const fetchGet = () => {
    fetch('https://localhost:44310/api/Peliculas')
      .then((response) => response.json())
      .then((data) => setPosts(data))
  }

  const searcher = (e) => {
    setSerch(e.target.value)
    //console.log(e.target)

  }

  const results = !search ? posts : posts.filter((pelicula) => pelicula.titles.toLowerCase().includes(search.toLocaleLowerCase()))
console.log(results)
  useEffect(() => {
    fetchGet()

  }, []);


  //Post
  const addPost = (titles, description, imagen) => {

    fetch('https://localhost:44310/api/Peliculas', {

      method: 'POST',
      body: JSON.stringify({
        Titles: titles,
        Description: description,
        Imagen: imagen
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'access-control-allow-origin': '*'
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPosts((prevPosts) =>
          [data, ...prevPosts])
      })

  }




  //PUT
  const handleUpdate = (id, titles, description, imagen) => {
    fetch(`https://localhost:44310/api/Peliculas/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        titles: titles,
        description: description,
        imagen: imagen
      }),
    })
      .then(response => {
        if (response.ok) {
          setPosts(prevPosts => {
            const newPosts = [...prevPosts];
            const index = newPosts.findIndex(post => post.id === id);
            if (index !== -1) {
              newPosts[index].titles = titles;
              newPosts[index].description = description;
              newPosts[index].imagen = imagen;
            }
            return newPosts;
          });
        }
        else {
          throw new Error('Hubo un error al actualizar los datos.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };






  //DELETE
  const deletePost = (id) => {

    fetch(`https://localhost:44310/api/Peliculas/${id}`, {
      method: 'DELETE'
    })

      .then((response) => {
        if (response.status === 200) {
          setPosts(
            posts.filter((Peliculas) => {
              return Peliculas.id !== id;
            })
          )
        }
      })
  }
  const onEditMovie = (pelicula) => {
    setOpenModalE(true);
    setMovieEdit(pelicula);
  }

  const handleShowDetail = (posts) => {
    setModalContent(posts);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalContent({});
  };



  return (

    <div className="App">

      <Header />
      <Nav setOpenModal={setOpenModal} posts={posts} search={search} searcher={searcher} />
      <Content pelicula={results} onEditMovie={onEditMovie} handleShowDetail={handleShowDetail} deletePost={deletePost} />
      <ModalCard isOpen={isModalOpen} toggle={handleCloseModal} pelicula={modalContent} />
      {openModal && <Agregar closeModal={setOpenModal} addPost={addPost} />}
      {openModalE && < Editar editPut={handleUpdate} closeModal={setOpenModalE} movieEdit={movieEdit} />}
      <Footer />

    </div>




  );

}


export default App;
