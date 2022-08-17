/*leemos las entradas de las opciones */
const piedraOpcion = document.getElementById("PIEDRA");
const  papelOpcion= document.getElementById("PAPEL");
const tijeraOpcion = document.getElementById("TIJERA");

/*leemos la entrada del resultado */

const resultado = document.getElementById("RESULTADO");
//iniciamos el juego
piedraOpcion.addEventListener("click", () => {
        iniciarJuego("PIEDRA" );
    });

papelOpcion.addEventListener("click", () =>{
    iniciarJuego("PAPEL");
});

tijeraOpcion.addEventListener("click", () =>{
    iniciarJuego("TIJERA");
});

function iniciarJuego(opcion){
    //moviminto del ordenador
    const movconsol = consola();
    //movimiento usuario
    const usuario = opcion;
    //comparacion de movimiento
    const comp = compracion(movconsol, usuario);
    //resultado
    if (comp ==1) {
        resultado.innerHTML = "ELEGISTE  "+ usuario + "<br> ELECCION DEL CONTRINCANTE "+ movconsol+ "<br> <span class='ganador'> MUY BIEN GANASTE </span>";
    }
    if (comp ==2) {
        resultado.innerHTML = " ELEGISTE "+usuario + "<br>ELECCION DEL CONTRINCANTE "+ movconsol+ "<br> <span class='perdedor'>UPS QUE TRISTE PERDISTE, SUERTE PARA LA PROXIMA</span>";
    }
    if (comp ==3) {
        resultado.innerHTML = " ELEGISTE " + usuario + "<br> ELECCION DEL CONTRINCANTE "+ movconsol + "<br> <span class='empate'> ESTO ES UN EMPATE </span>";
    }
}

function consola(){
    const opciones = ['PIEDRA', 'PAPEL', 'TIJERA'];
    const random = Math.floor(Math.random()*3);
    const movimiento = opciones[random];
    return (movimiento);
}

function compracion(pc, usuario){
    switch (usuario+pc){
        case 'PIEDRATIJERA':
        case 'PAPELPIEDRA':
        case 'TIJERAPAPEL':
            return 1; //gana
        case 'TIJERAPIEDRA':
        case 'PIEDRAPAPEL':
        case 'PAPELTIJERA':
            return 2; //pierde
        case 'PAPELPAPEL':
        case 'PIEDRAPIEDRA':
        case 'TIJERATIJERA':
            return 3; //empata
    }
}