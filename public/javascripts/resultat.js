var socket = io.connect('http://localhost:8000');

socket.emit('projectorConnection');

socket.on('receiveDataQuestion', displayChart);

function displayChart(dataQuestion) {
    updateChart(dataQuestion);
}
