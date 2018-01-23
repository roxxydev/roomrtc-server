'use strict'

const Server = require('./lib/server');
const WebsocketWrapper = require('./lib/websocketWrapper');


Server.setupServer()
    .then((server) => {

        return new WebsocketWrapper().startWebsocket(server);
    })
    .then((websocketWrapper) => {

        Server.assignWebsocketWrapper(websocketWrapper);
        return Promise.resolve(websocketWrapper);
    })
    .then(() => {

        return Server.startServer();
    })
    .then((server) => {

        console.log(`Server started at: ${server.info.uri}`);
    })
    .catch((err) => {

        console.log(err);
    });
