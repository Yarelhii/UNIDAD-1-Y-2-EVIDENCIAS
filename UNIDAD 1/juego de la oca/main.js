var jugadores = [0,1];
var numTurnos = jugadores.length;
var tablero;
var contexto;
var r ;
var a ;
var rojaX, rojaY, amarillaX, amarillaY;
var turno;
var turnoRoja = false;
var turnoAmarilla = false;
var movimiento=0;
var casillasRoja = [[],[145,519],[238,504],[360,515],[425,500],[522,496],[624,491],[717,500],[746,461],[746,359],[747,262],[747,161],[740,118],[697,35],[600,41],[499,37],[402,40],[304,40],[202,39],[77,34],[43,109],[45,202],[49,297],[99,357],[70,440],[175,429],[294,384],[395,373],[491,379],[583,430],[626,333],[624,254],[595,144],[501,146],[399,150],[304,148],[196,147],[148,229],[163,322],[301,270],[423,314],[],[],[],[],[]];
var casillasAmarilla = [[],[143,557],[226,551],[354,560],[427,551],[518,547],[621,546],[721,549],[794,503],[746,412],[748,316],[746,212],[796,115],[697,97],[602,96],[500,102],[399,93],[302,40],[200,87],[126,77],[95,108],[103,204],[103,301],[51,403],[131,444],[248,432],[293,439],[395,432],[487,431],[655,434],[693,355],[693,247],[597,207],[499,191],[396,194],[301,205],[253,194],[208,224],[235,320],[305,316],[481,314],[],[],[],[],[]];
var turnosPerdidosRoja = 0;
var turnosPerdidosAmarilla = 0;
var turnosPerdidos = turnosPerdidosRoja + turnosPerdidosAmarilla;
var fondo = {
	imagenURL: "img/tablero_oca.jpeg"
};
function iniciar(){
	tablero = document.getElementById('tablero');
	tablero.width = 842;
	tablero.height = 596;
	contexto = tablero.getContext("2d");
	fondo.imagen = new Image();
	fondo.imagen.src = fondo.imagenURL;
	fondo.imagen.onload = confirmarFondo;
}
function confirmarFondo(){
	fondo.imagenOK = true;
	dibujarFondo();
	dibujarFichaRoja();
	dibujarFichaAmarilla();
}
function dibujarFondo(){
	var contexto = this.contexto;
	contexto.drawImage(fondo.imagen, 0,0);
}
function dibujarFichaRoja(){
	contexto.beginPath();
	contexto.arc(rojaX, rojaY, 15, 0, Math.PI *2, true);
	contexto.fillStyle = "#F00";
	contexto.fill();
	contexto.lineWidth = 3;
	contexto.strokeStyle = "black";
	contexto.stroke();
	contexto.closePath();
}
function dibujarFichaAmarilla(){
	contexto.beginPath();
	contexto.arc(amarillaX,amarillaY, 15, 0, Math.PI *2, true);
	contexto.fillStyle = "#FF0";
	contexto.fill();
	contexto.lineWidth = 3;
	contexto.strokeStyle = "black";
	contexto.stroke();
	contexto.closePath();
}
function situaFichas(){
	var posicionRoja = casillasRoja[r];
	rojaX = posicionRoja[0];
	rojaY = posicionRoja[1];
	var posicionAmarilla = casillasAmarilla[a];
	amarillaX = posicionAmarilla[0];
	amarillaY = posicionAmarilla[1];
}
function moverFichaRoja(){
	situaFichas();
	dibujarFondo();
	dibujarFichaRoja();
	dibujarFichaAmarilla();
	alerta(" ");
}
function moverFichaAmarilla(){
	situaFichas();
	dibujarFondo();
	dibujarFichaRoja();
	dibujarFichaAmarilla();
	alerta(" ");
}
function sorteoInicial(){
	turno = Math.round(Math.random()*(numTurnos-1));
	asignarTurno();
	iniciaPartida();
}
function iniciaPartida(){
	r = 1;
	a = 1;
	situaFichas();
	dibujarFondo();
	dibujarFichaRoja();
	dibujarFichaAmarilla();
	inicioJuego();
}
function asignarTurno(){
	if(turno === 0){
		turnoRoja = true;
		turnoAmarilla = false;
		alerta("la ficha roja");
		cambiarCubilete();
	}
	if(turno == 1){
		turnoAmarilla = true;
		turnoRoja = false;
		alerta("la ficha Amarilla");
		cambiarCubilete();
	}
}
function cambiarTurno(){
	if(turnoRoja === true){
		turnoRoja = false;
		turnoAmarilla = true;
		 cambiarCubilete();
	}
	else if(turnoAmarilla === true){
		turnoAmarilla = false;
		turnoRoja = true;
		 cambiarCubilete();
	}
}
function tirada(){
	if(turnoRoja === true & turnosPerdidosRoja>0){
		turnosPerdidosRoja--;
		alerta("Turnos Perdidos Ficha Roja"+turnosPerdidosRoja);
		cambiarTurno();
		lanzarDado();
	}
	else if(turnoAmarilla === true & turnosPerdidosAmarilla>0){
		turnosPerdidosAmarilla--;
		alerta("Turnos Perdidos Ficha Amarilla"+turnosPerdidosAmarilla);
		cambiarTurno();
		lanzarDado();
	}	
	else if(turnosPerdidos ===0){
		lanzarDado();
	}
}
function lanzarDado(){
	movimiento = Math.round(Math.random()*(6-1)+1);
	cambiarDado();
	alerta("...avanza "+ (movimiento) + " casillas");
	window.setTimeout("moverFichas()",500);
}
function moverFichas(){
		dado = document.getElementById("dadoEnJuego");
		cambiarCubilete();

	if(turnoRoja === true){
		r += movimiento;
		moverFichaRoja();
		comprobarCasilla(r);
		cambiarTurno();
	}
	else if(turnoAmarilla === true){
		a += movimiento;
		moverFichaAmarilla();
		comprobarCasilla(a);
		cambiarTurno();
	}
}
function moverFichasEspecial(){
	if(turnoRoja === true){
		r += movimiento;
		window.setTimeout("moverFichaRoja()",1500);
		cambiarTurno();
	}
	else if(turnoAmarilla === true){
		a += movimiento;
		window.setTimeout("moverFichaAmarilla()",1500);
		cambiarTurno();
	}
}
function comprobarCasilla(casilla){
	if(casilla == 5){
		casilla_5();
	}
	else if(casilla == 9){
		casilla_9();
	}
	else if(casilla == 14){
		casilla_14();
	}
	else if(casilla == 18){
		casilla_18();
	}
	else if(casilla == 23){
		casilla_23();
	}
	else if(casilla == 27){
		casilla_27();
	}
	else if(casilla == 32){
		casilla_32();
	}
	else if(casilla == 36){
		casilla_36();
	}
	else if(casilla == 6){
		casilla_6();
	}
	else if(casilla == 12){
		casilla_12();
	}
	//Dados
	else if(casilla == 26){
		casilla_26();
	}
	else if(casilla == 19){
		casilla_19();
	}
	//El pozo
	else if(casilla == 31){
		casilla_31();
	}
}
function alerta(mensaje){
	var alerta;
	alerta = document.getElementById("alerta");
	alerta.innerHTML = mensaje;

}
function oca(){
	alerta('"De oca a oca y tiro porque me toca"');
}
function casilla_5(){
	oca();
	movimiento = 4;
	moverFichasEspecial();
}
function casilla_15(){
	oca();
	movimiento = 5;
	moverFichasEspecial();
}
function casilla_20(){
	oca();
	movimiento = 5;
	moverFichasEspecial();
}
function casilla_25(){
	oca();
	movimiento = 4;
	moverFichasEspecial();
}
function casilla_30(){
	oca();
	movimiento = 5;
	moverFichasEspecial();
}
function casilla_35(){
	oca();
	movimiento = 4;
	moverFichasEspecial();
}
//punte
function casilla_9(){
	alerta('"De puente a puente y tiro porque me lleva la corriente"');
	movimiento = 6;
	moverFichasEspecial();
}
function casilla_18(){
	alerta('"De puente a puente y tiro porque me lleva la corriente"');
	movimiento = -6;
	moverFichasEspecial();
}
/************ Funciones de las casillas que pierden turnos ****************************/
function casilla_13(){
	alerta('"En la posada pierdes un turno"');
	if(turnoRoja === true){
		turnosPerdidosRoja = 1;
	}
	if(turnoAmarilla === true){
		turnosPerdidosAmarilla = 1;
	}
}
function sobre(){
	var elementoDadoSorteo = document.getElementById("dadoSorteo");
	var elementoDado = document.getElementById("dadoEnJuego");
	elementoDadoSorteo.style.cursor ="pointer";
	elementoDado.style.cursor ="pointer";
}
/***************************COMPORTAMIENTO DE LOS PANELES ***********************/
var panelInicio;
var panelSorteo;
var panelJuego;
var panelFinal;
function ocultarPanelInicio(){
	panelInicio = document.getElementById("panelInicio");
	panelInicio.classList.add("oculto");
	panelInicio.classList.remove("visible");
}
function mostrarPanelSorteo(){
	panelSorteo = document.getElementById("panelSorteo");
	panelSorteo.classList.remove("oculto");
	panelSorteo.classList.add("visible");
}
function ocultarPanelSorteo(){
	panelSorteo = document.getElementById("panelSorteo");
	panelSorteo.classList.remove("visible");
	panelSorteo.classList.add("oculto");
}
function mostrarPanelJuego(){
	panelJuego = document.getElementById("panelJuego");
	panelJuego.classList.remove("oculto");
	panelJuego.classList.add("visible");
}
function ocultarPanelJuego(){
	panelJuego = document.getElementById("panelJuego");
	panelJuego.classList.remove("visible");
	panelJuego.classList.add("oculto");
}
function mostrarPanelFinal(){
	panelFinal = document.getElementById("panelFinal");
	panelFinal.classList.remove("oculto");
	panelFinal.classList.add("visible");
}
function ocultarPanelFinal(){
	panelFinal = document.getElementById("panelFinal");
	panelFinal.classList.remove("visible");
	panelFinal.classList.add("oculto");
}
function jugar(){
	ocultarPanelInicio();
	ocultarPanelFinal();
	ocultarPanelJuego();
	mostrarPanelSorteo();
}
function inicioJuego(){
	ocultarPanelSorteo();
	mostrarPanelJuego();
}
function finPartida(){
	ocultarPanelJuego();
	mostrarPanelFinal();
}
/************************Ganador**************************************/
var victoriasRojo = 0;
var victoriasAmarillo = 0;
var marcadorRojo, marcadorAmarillo;
function ganador(){
	var dadoGanador = document.getElementById("dadoGanador");
	if(r == 40){
		dadoGanador.style.backgroundImage="url('img/campeonRojo.png')";
		victoriasRojo = victoriasRojo + 1;
	}
	if(a == 40){
		dadoGanador.style.backgroundImage="url('img/campeonAmarillo.png')";
		victoriasAmarillo = victoriasAmarillo + 1;
	}
actualizarMarcador();
console.log("Puntos amarillo " + victoriasAmarillo )
console.log("Puntos rojo " + victoriasRojo )
}
function actualizarMarcador(){
	marcadorAmarillo = document.getElementById("marcadorAmarillo");
	marcadorRojo = document.getElementById("marcadorRojo");
	marcadorRojo.value = victoriasRojo;
	marcadorAmarillo.value = victoriasAmarillo;
}
	var dado ;
function cambiarCubilete(){
	dado = document.getElementById("dadoEnJuego");
	var dadoUrl;
	if(turnoRoja === true){
		dadoUrl = "url(img/cubileteRojo.png)";
		dado.style.backgroundImage=dadoUrl;
	}else if(turnoAmarilla ===true){
		dadoUrl = "url(img/cubileteAmarillo.png)";
		dado.style.backgroundImage=dadoUrl;
	}
}
function cambiarDado(){
	dado = document.getElementById("dadoEnJuego");
	if(turnoRoja === true){
		var dadoUrl = "url(img/dadoRojo_"+movimiento+".png)";
		dado.style.backgroundImage=dadoUrl;
	}
	else if(turnoAmarilla === true){
		var dadoUrl = "url(img/dadoAmarillo_"+movimiento+".png)";
		dado.style.backgroundImage=dadoUrl;
	}
}
function seleccionarFicha(color){
	var colorJugador;
	var juegasCon;
	juegasCon = document.getElementById("colorJugador");
	if(color == "rojo"){
		colorJugador = color;
		juegasCon.innerHTML = "Juegas con la ficha roja"
		}
	else if(color == "amarillo"){
		colorJugador = color;
		juegasCon.innerHTML = "Juegas con la ficha amarilla"
	}
}