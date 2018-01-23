'use strict';

const Boom = require('boom');


exports.run = async function (request, h) {

    const server = request.server;
    const websocket = server.app.websocket;
    const spiels = server.app.spiels.server;
    const constructBoomOk = server.methods.constructBoomOkResponse;
    const payload = request.payload;

    return await websocket.actions.broadcastMsg(payload.msg)
        .then(() => {

            const statusCode = 200;
            const response = constructBoomOk(statusCode, spiels.messageBroadcasted);
            return h.response(response).code(statusCode);
        })
        .catch((e) => {

            if (e.isSocket) {
                return Boom.badRequest(e);
            }

            throw new Error(spiels.unexpectedError);
        });
};
