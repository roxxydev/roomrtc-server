'use strict';

const Boom = require('boom');


exports.run = async function (request, h) {

    const server = request.server;
    const websocket = server.app.websocket;
    const cache = server.app.cache;
    const spiels = server.app.spiels.server;
    const roomEvent = server.app.setup.roomEventBcast;
    const constructBoomOk = server.methods.constructBoomOkResponse;
    const validateCallRoom = server.methods.validateCallRoom;
    const constructRoomEventSdp = server.methods.constructRoomEventSdp;
    const payload = request.payload;

    const roomId = payload.room;
    const username = payload.username;
    const sdpOffer = payload.sdpOffer;

    return await validateCallRoom(payload)
        .then(() => {

            return cache.get(roomId);
        })
        .then((cacheRoom) => {

            const msg = constructRoomEventSdp(roomId, roomEvent.callRoom, cacheRoom.participants, sdpOffer, true);

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
