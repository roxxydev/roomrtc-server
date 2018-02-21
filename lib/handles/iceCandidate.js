'use strict';

const Boom = require('boom');


exports.run = async function (request, h) {

    const server = request.server;
    const websocket = server.app.websocket;
    const cache = server.app.cache;
    const spiels = server.app.spiels.server;
    const roomEvent = server.app.setup.roomEventBcast;
    const constructBoomOk = server.methods.constructBoomOkResponse;
    const validateRoomIce = server.methods.validateRoomIce;
    const constructRoomIceEvent = server.methods.constructRoomIceEvent;
    const payload = request.payload;

    const roomId = payload.room;
    const username = payload.username;
    const ice = payload.ice;

    return await validateRoomIce(payload)
        .then(() => {

            return cache.get(roomId);
        })
        .then(() => {

            const msg = constructRoomIceEvent(roomId, roomEvent.iceCandidate, ice);
            return Promise.resolve(msg);
        })
        .then((msg) => {

            const bcastMsg = msg;
            websocket.actions.broadcastMsg(JSON.stringify(bcastMsg), [username]);
        })
        .then(() => {

            const statusCode = 200;
            const response = constructBoomOk(statusCode, '');
            return h.response(response).code(statusCode);
        })
        .catch((e) => {

            if (e.isJoi || e.isSocket) {
                return Boom.badRequest(e);
            }

            throw new Error(spiels.unexpectedError);
        });
};
