'use strict';

const Hapi = require('hapi');
const Routes = require('./route');
const Methods = require('./methods');
const Config = require('./config');


const options = Object.assign({}, Config.connection, Config.log);
const server = Hapi.server(options);

server.app = Object.assign({}, Config.app, { websocket: {} });

server.route(Routes.load);
server.method(Methods.load());


exports.setupServer = async function setupServer() {

    return Promise.resolve(server);
};

exports.startServer = async function startServer() {

    const promiseStart = await server.start().then(() => {

        return server;
    });

    return promiseStart;
};

/**
 * Assign Websocket instance so hapi routes can access it via server.app
 * @param websocketWrapper {Object} The websocket instance
 */
exports.assignWebsocketWrapper = (websocketWrapper) => {

    server.app.websocket = websocketWrapper;

    websocketWrapper.setMsgReceiver((msg) => {

        console.log(`msgReceiver: ${msg}`);
    });
};
