const http = require("http");
const express = require( "express");
const WebSocket = require( "ws");
const DataImitator = require("./DataImitator");

const imitator = new DataImitator();

const app = express();

const server = http.createServer(app);

const webSocketServer = new WebSocket.Server({ server });

webSocketServer.on('connection', ws => {
   ws.on('message', m => {
      if (m === 'getData' || m === 'getMoreData') {
         imitator.updateData();
         const newData = imitator.getData();
         webSocketServer.clients.forEach(client => {
            client.send(JSON.stringify(newData))
         });
      }
   });

   ws.on("error", e => ws.send(e));
});

server.listen(8999, () => console.log("Server started"))