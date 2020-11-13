//Comando para establecer la comunicacion.
const socket = io();
const audio = document.querySelector('audio');
console.log("audio", audio);

const searchParams = new URLSearchParams( window.location.search );

if (!searchParams.has('escritorio')) {
	window.location = 'index.html';
	throw new Error('El escritorio es necesario');
}

const escritorio = searchParams.get('escritorio');
const label = document.querySelector('small');

document.querySelector('h1').textContent = `Escritorio ${escritorio}`;

document.querySelector('button').addEventListener('click', () => {
	
	audio.play();

	socket.emit('atenderTicket', {escritorio}, (res) => {
		label.textContent = `${res.numero || '...'}`
	});
});