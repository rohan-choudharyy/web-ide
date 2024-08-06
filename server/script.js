const io = require('socket.io-client');

const socket = io('http://localhost:4000');

socket.on('connect', () => {
  console.log('Connected to server');
  socket.emit('terminal:write', 'ls\n');
});

socket.on('terminal:data', (data) => {
  console.log('Received data:', data);
});