'use strict';

const WebSocket = require('ws');


class WebSocketWrapper {

    constructor() {

        // Actions are only initialized after wss has been initialized
        this.actions = {
            /**
             * Broadcast message to websocket client
             * @param msg {String} The string message to send
             * @param blacklistSession {Array} List of sessionId of websocket clients where msg won't be
             *  broasdcasted to. Pass empty array if to broadcast to all websocket clients.
             * @returns {Promise}
             */
            broadcastMsg: Promise.resolve(),
            incomingMsg: null,
            connectionReceiver: null
        };

        this.isConnected = false
        this.wssInstance = null;
    }

    _setupActions(websocketServer) {
        const wsBroadcast = (msg, blacklistSession) => {

            console.log(`broadcast message: ${msg}`);
            websocketServer.clients.forEach((wsClient) => {

                if (wsClient.readyState === WebSocket.OPEN &&
                    blacklistSession.indexOf(wsClient.sessionId) < 0) {
                    wsClient.send(msg);
                }
            });
        };

        this.actions.broadcastMsg = (msg, blacklistSession) => {

            if (this.isConnected) {
                return Promise.resolve(wsBroadcast(msg, blacklistSession));
            }

            const err = new Error('Server websocket not connected');
            err.isSocket = true;

            return Promise.reject(err);
        };

        websocketServer.on('connection', (wsClient, clientHttpGetReq) => {

            // Assign unique ID for websocket client
            const sessionId = clientHttpGetReq.headers['session-id'];
            if (sessionId) {
                wsClient.sessionId = sessionId;
            }

            if (this.actions.connectionReceiver) {
                this.actions.connectionReceiver(wsClient, clientHttpGetReq);
            }

            wsClient.on('message', (msg) => {

                if (this.actions.incomingMsg) {
                    this.actions.incomingMsg(msg);
                }
            });
        });
    }

    _setupServer(wss) {
        this._setupActions(wss);
        this.wssInstance = wss;
        this.isConnected = true;

        return this;
    }

    // Return Promise with resolve value to WebsocketWrapper instance itself
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
