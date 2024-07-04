// TODOS Song Data

const songList = [
  {
    title: "Acoustic Breeze",
    File: "acousticbreeze.mp3",
    cover: "1.jpeg",
  },
  {
    title: "A New Beginnig",
    File: "anewbeginning.mp3",
    cover: "2.jpeg",
  },
  {
    title: "Creative Minds",
    File: "creativeminds.mp3",
    cover: "3.jpeg ",
  },
];

//*Cancion Actual

let actualSong = -1;
//*  capturar elementos del DOM para trabajar con JS
const songs = document.getElementById("songs");
const audio = document.getElementById("audio");
const cover = document.getElementById("cover");
const title = document.getElementById("title");
const play = document.getElementById("play");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");

progressContainer.addEventListener("click", setProgress);
//*Escuchar elemento audio
audio.addEventListener("timeupdate", updateProgress);

//*Escuchar click en el boton play
play.addEventListener("click", () => {
  if (audio.paused) {
    playSong();
  } else {
    pauseSong();
  }
});

//* Cargar Canciones y Mostrar el Listado
const loadSongs = () => {
  songList.forEach((song, index) => {
    //*Crear li
    const li = document.createElement("li");

    //*Crear a
    const link = document.createElement("a");

    //*Hidratar a
    link.textContent = song.title;
    link.href = "#";
    //* Echucahr click
    link.addEventListener("click", () => loadSong(index));

    //*Añadir a li
    li.appendChild(link);

    //*Añadir li a ul
    songs.appendChild(li);
  });
};
//* Cargar cancion seleccionada
const loadSong = (songIndex) => {
  console.log(songIndex);
  if (songIndex >= 0) {
    changeActivesClass(actualSong, songIndex);
    if (songIndex != actualSong) {
      actualSong = songIndex;
      audio.src = "/audio/" + songList[songIndex].File;
      playSong();
      changeCover(songIndex);
      changeTitle(songIndex);
    }
  }
};

//* Actualizar barra de progreso
function updateProgress(event) {
  //* total y actual
  const { duration, currentTime } = event.srcElement;
  const percent = (currentTime / duration) * 100;
  progress.style.width = percent + "%";
}

//*Hacer la barra de progreso clicable

function setProgress(event) {
  const totalWidth = this.offsetWidth;
  const progressWidth = event.offsetX;
  const current = (progressWidth / totalWidth) * audio.duration;
  audio.currentTime = current;
}
//* Actualizar Controles
const updateControls = () => {
  if (audio.paused) {
    play.classList.remove("fa-pause");
    play.classList.add("fa-play");
  } else {
    play.classList.add("fa-pause");
    play.classList.remove("fa-play");
  }
};

//*Reproducir cancion
const playSong = () => {
  if (actualSong >= 0) {
    audio.play();
    updateControls();
  }
};
//* Pausar cancion
const pauseSong = () => {
  audio.pause();
  updateControls();
};
//*Cambiar clase Activba

const changeActivesClass = (lastIndex, newIndex) => {
  const links = document.querySelectorAll("a");
  if (lastIndex >= 0) {
    links[lastIndex].classList.remove("active");
  }

  links[newIndex].classList.add("active");
};

//*Cambiar el cover de la cancion
const changeCover = (songIndex) => {
  cover.src = "/img/" + songList[songIndex].cover;
};
//*Cambiar el titulo
const changeTitle = (songIndex) => {
  title.innerHTML = songList[songIndex].title;
};

//* Anterior cancion
const prevSong = () => {
  if (actualSong > 0) {
    loadSong(actualSong - 1);
  } else {
    loadSong(songList.length - 1);
  }
};

//* Siguiente cancion
const nextSong = () => {
  if (actualSong < songList.length - 1) {
    loadSong(actualSong + 1);
  } else {
    loadSong(0);
  }
};

//* GO!
loadSongs();
