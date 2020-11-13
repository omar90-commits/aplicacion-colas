//Comando para establecer la comunicacion.
const socket = io();

const ticket1 = document.querySelector('#lblTicket1');
const ticket2 = document.querySelector('#lblTicket2');
const ticket3 = document.querySelector('#lblTicket3');
const ticket4 = document.querySelector('#lblTicket4');

const escritorio1 = document.querySelector('#lblEscritorio1');
const escritorio2 = document.querySelector('#lblEscritorio2');
const escritorio3 = document.querySelector('#lblEscritorio3');
const escritorio4 = document.querySelector('#lblEscritorio4');

const lblTickets = [ticket1, ticket2, ticket3, ticket4];
const lblEscritorios = [ escritorio1,  escritorio2,  escritorio3,  escritorio4];

socket.on('estadoActual', res => {

	const { ultimos4 } = res;
	
	actualizaHTML(ultimos4);
});

socket.on('ultimos4', res => actualizaHTML(res));

function actualizaHTML(ultimos4) {
	
	for (let i = 0; i < ultimos4.length; i++) {
		lblTickets[i].textContent = `Ticket ${ultimos4[i].numero}`;
		lblEscritorios[i].textContent = `Escritorio ${ultimos4[i].escritorio}`;
	}
}