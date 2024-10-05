import http from 'http';
import {WebSocketServer} from 'ws';
import { parse } from 'url';
import { v4 as uuidv4 } from 'uuid';

const server = http.createServer();
const wsServer = new WebSocketServer({ server });

const port = 8000;

const connections = {}
const users = {}

const broadcast = () => {
    Object.keys(connections).forEach(uniqueId => {
        const connection = connections[uniqueId];
        const message = JSON.stringify(users);
        connection.send(message);
    })
}

const handleMessage = (bytes, uniqueId) => {
    //message : {x: 0, y: 0}
    const message = JSON.parse(bytes.toString());
    const user = users[uniqueId];
    user.state = message;
    broadcast();
    console.log("Message : ", message, "unique Id: ", uniqueId);
}

const handleClose = (uniqueId) => {
    delete connections[uniqueId];
    delete users[uniqueId];

    broadcast();
}

wsServer.on("connection", (connection, request)=>{
    const {username} = parse(request.url, true).query;
    const uniqueId = uuidv4();
    console.log(`${username} connected`);
    connections[uniqueId] = connection //add connection id to the connections dictionary
    users[uniqueId] = {
        username,
        state: { //values to watch for update on
            x: 0,
            y: 0
         }
    }
    connection.on("message", message => handleMessage(message, uniqueId))
    connection.on("close", () => handleClose(uniqueId))
}) 
server.listen(port, ()=>{
    console.log("Web socket server running on port ", port);
})