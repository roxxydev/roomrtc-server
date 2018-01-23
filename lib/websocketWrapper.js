'use strict';

const WebSocket = require('ws');

class WebSocketWrapper {

    constructor() {

        // Actions are only initialized after wss has been initialized
        this.actions = {
            broadcastMsg: Promise.resolve(),
            incomingMsg: null
        };

        this.isConnected = false
        this.wssInstance = null;
    }

    _setupActions(wss) {
        const wsBroadcast = (msg) => {

            wss.clients.forEach((client) => {

                if (client.readyState === WebSocket.OPEN) {
                    client.send(msg);
                }
            });
        };

        this.actions.broadcastMsg = (msg) => {

            if (this.isConnected) {
                return Promise.resolve(wsBroadcast(msg));
            }

            const err = new Error('Server websocket not connected');
            err.isSocket = true;

            return Promise.reject(err);
        };

        wss.on('connection', (ws) => {

            ws.on('message', (msg) => {

                if (this.actions.incomingMsg) {
                    this.actions.incomingMsg(msg);
                }
            });

            ws.send('something');
        });
    }

    _setupServer(wss) {
        this._setupActions(wss);
        this.wssInstance = wss;
        this.isConnected = true;

        return this;
    }

    /**
     * Return Promise with resolve value to WebsocketWrapper instance itself
     */
    startWebsocket(server) {

        return new Promise((resolve, reject) => {

            try {
                // server.listener is the node http server of hapi
                const wss = new WebSocket.Server({ server: server.listener });

                this._setupServer(wss);
                console.log('Websocket successfully initialized');
                resolve(this);
            }
            catch (err) {
                this.wssInstance = null;
                reject(err);
            }
        });
    }

    setMsgReceiver(receiver) {
        this.actions.incomingMsg = receiver;
    }

    closeWebsocket() {
        this.wssInstance.close();
        this.wssInstance = null;
        this.isConnected = false;
        console.log('Websocket successfully closed');
        return Promise.resolve(this);
    }
}

module.exports = WebSocketWrapper;
