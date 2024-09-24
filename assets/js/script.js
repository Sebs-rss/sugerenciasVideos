// Patrón IIFE, autoejecutable

//Crearemos una función que retorne una función y que llame a la otra
const VideoModule = ( () => { // Patrón IIFE global

    let inyectionPrivate = (url,idIframe) => { // "Id" será el <iframe> completo, que sirve para insertar cosas completas, como renderizar video. Tb se pueden insertar hasta web completas, se usa para integraciones entre páginas

        idIframe.setAttribute('src',url); // en el HTML, en la propiedad "src" se pone la URL del video
        idIframe.style.display='block'; // se pone visible el <iframe>
    }

    return { // función gemela a la de arriba, para poder encapsular la de arriba, llamaré a esta
        showAllPublic:(url,idIframe) => inyectionPrivate(url,idIframe)
    }

}) () // el "()" final la vuelve autoejecutable

// Creo las clases que se piden

class Multimedia {
    constructor (url) {
        this._url = url; // encapsulada
    }

    getUrl () {
        return this._url
    }


    setInicio () { // comienza la reproducción desde un punto especifico, se sobreescribirá después
    }
}

class Reproductor extends Multimedia { // hereda de multimedia
    constructor (url, id) {
        super(url); // la url viene de la otra clases
        this._id = id;
        this._inicio = 0; // por defecto desde el inicio
    }

    playMultimedia() {
        VideoModule.showAllPublic(this._url,this._id); // usa las variables aquí referenciadas
    }

    setInicio (tiempoReproduccion) {
        this._id.setAttribute('src',`${this._url}?start=${tiempoReproduccion}`); // toma el tiempo  de incio como parámetro
    }
}

// Creo las instancias de clases

let peli = new Reproductor('https://www.youtube.com/embed/5PSNL1qE6VY',document.getElementById('peliculas'));
let musi = new Reproductor('https://www.youtube.com/embed/LP0y_SflxqU?si=Y6VFDTaudOlBOcBK ',document.getElementById('musica'));
let serie = new Reproductor('https://www.youtube.com/embed/HhesaQXLuRY ',document.getElementById('series'));

peli.playMultimedia(); // métodos heredados
musi.playMultimedia();
serie.playMultimedia();

peli.setInicio(100);  // parte desde el 100 segundos


