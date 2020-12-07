const http = require('http');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const server = express();
const httpServer = http.createServer(server);
const io = require('socket.io')(httpServer);

const connectionString = 'mongodb://localhost:27017/music-app?readPreference=primary&appname=MongoDB%20Compass&ssl=false'
mongoose.connect(connectionString, { useUnifiedTopology: true, useNewUrlParser: true});

const musicFactory = require('./musicFactory');
const searchRouter = require('./routes/searchRoute');

server.use(express.static('public'));
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

musicFactory.init();

server.get('/musicData', (req, res) => {
    const musicData = musicFactory.getMusicData();
    res.status(200).json(musicData);
})

server.use('/search', searchRouter);

server.post('/download', (req, res) => {
    const id = req.body.id
    const downloadedMusic = musicFactory.downloadSong(id);
    res.status(200).json(downloadedMusic);
})

server.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'index.html'));
})
httpServer.listen(8080, () => {
    console.log('listening to port 8080');
})

//socket io
io.on('connection', (socket) => {
    socketEvent(socket.id, 'connection');
    console.log('SOCKET - Connection accepted.');
    socket.on('disconnect', () => {
        socketEvent(socket.id, 'disconnect');
        console.log('SOCKET - Disconnected');
    })
    socket.on('download', (songId) => {
        downloadEvent(socket.id, songId);
        console.log('SOCKET - Received client message to download music id: '+ songId);
        socket.emit('download-received', songId);
    })
})

//mongoose
const { Schema } = mongoose;
const socketEventSchema = new Schema({
    socket: String,
    type: String,
    eventTime: Date
});
const SocketEvent = mongoose.model('SocketEvent',socketEventSchema);
const downloadEventSchema = new Schema({
    socket: String,
    songId: String,
    downloadTime: Date
});
const DownloadEvent = mongoose.model('DownloadEvent',downloadEventSchema);

function socketEvent(socketId, type) {
    const doc = new SocketEvent({
        socket: socketId,
        type: type,
        eventTime: new Date(Date.now())
    });
    doc.save();
}
function downloadEvent(socketId, songId) {
    const doc = new DownloadEvent({
        socket: socketId,
        songId: songId,
        downloadTime: new Date(Date.now())
    });
    doc.save();
}