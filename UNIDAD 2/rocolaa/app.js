let currentMusic = 0;

const Rocola = document.querySelector('#audio');

const Busqueda = document.querySelector('.Busqueda');
const Nombre = document.querySelector('.Nombre');
const Artista = document.querySelector('.Artista');
const Disco = document.querySelector('.Disco');
const  Tiempo = document.querySelector('.Tiempo');
const Duracion = document.querySelector('.Duracion');
const Play = document.querySelector('.Play');
const Delante = document.querySelector('.Delante');
const Atras = document.querySelector('.Atras');

Play.addEventListener('click', () => {
    if(Play.className.includes('pause')){
        music.Play();
    }else{
        music.pause();
    }
    Play.classList.toggle('Pause');
    Disco.classList.toggle('Play');
})

const setMusic = (i) => {
    Buscar.value = 0;
    let song = songs [i];
    music = i;
    music.src =song.path;

    Nombre.innerHTML = song.Nombre;
    Artista.innerHTML = song.Artista;
    Disco.style.backgroundimg = 'url('${song.cover}')';

    Duracion.innerHTML = '00:00';}
        setTimeout(()=>{
            Busqueda.max = music.Duracion;
            music.Duracion.innerHTML = formatTime (music.Duracion);
        }, 330);
    
    


setMusic(0);

const formatTime =(time) =>{
    let min = Math.floor(time / 60);
    
    if(min < 10){
        min ='0${min}';
    }
    let sec = Math.floor(time % 60);
    
    if(sec < 10){
        sec = '0${sec}';
    }    
    return '${min} : ${sec}';
}

setInterval(()=>{
  Busqueda.value = music.Tiempo;
  Tiempo.innerHTML = formatTime(music.Tiempo);
  if(Math.floor(music.Tiempo)== Math.floor(Busqueda.max)){
    Delante.click();
  }
}, 500)

Busqueda.addEventListener('cambio', ()=> {
    music.Tiempo = Busqueda.value;
})

const playMusic =() => {
    music.play();
    Play.classList.remove('pause');
    Disco.classList.add('play');
}

Delante.addEventListener('click', () => {
    if(currentMusic >= songs.length - 1){
        currentMusic = 0;
    }else{
        currentMusic++;
    }
    setMusic(currentMusic);
    Play.click();
})

Atras.addEventListener('click', () => {
    
    if(currentMusic <= 0){
        currentMusic = songs.length - 1;
    }else{
        currentMusic++;
    }
    setMusic(currentMusic);
    Play.click();
})