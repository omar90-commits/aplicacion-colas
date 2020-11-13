const label = document.querySelector('#lblNuevoTicket');

//Comando para establecer la comunicacion.
const socket = io();

socket.on('connect', () => {
	console.log('connect')
});

socket.on('disconnect', () => {
	console.log('disconnect')
});

socket.on('estadoActual', res => {

	const { actual } = res;
	label.textContent = actual;	
});

document.querySelector('button').addEventListener('click', () => {
	
	socket.emit('siguienteTicket', null, siguienteTicket => {
		label.textContent = siguienteTicket;
	});
});