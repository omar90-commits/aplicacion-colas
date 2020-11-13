const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', client => {

	client.on('siguienteTicket', (data, callback) => {

		const siguiente = ticketControl.siguiente();

		callback(siguiente);
	});

	//Emitir un evento 'estadoActual'
	client.emit('estadoActual', { 
		actual: ticketControl.getUltimoTikect,
		ultimos4: ticketControl.getUltimos4, 
	});

	client.on('atenderTicket', (data, callback) => {

		if (!data.escritorio) {
			return callback({
				err: true,
				message: 'El escritorio es necesario',
			});
		}

		const atenderTicket = ticketControl.atenderTicket(data.escritorio);

		callback(atenderTicket);
		
		// Actualizar/ notificar cambios en los ultimos 4
		client.broadcast.emit('ultimos4', ticketControl.getUltimos4);
	});
});

module.exports = io;