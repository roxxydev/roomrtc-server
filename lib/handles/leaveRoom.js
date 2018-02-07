'use strict';

const Boom = require('boom');


exports.run = async function (request, h) {

    const server = request.server;
    const websocket = server.app.websocket;
    const cache = server.app.cache;
    const spiels = server.app.spiels.server;
    const roomEvent = server.app.setup.roomEventBcast;
    const constructBoomOk = server.methods.constructBoomOkResponse;
    const constructRoomEvent = server.methods.constructRoomEvent;
    const validatorRoom = server.methods.validateRoom;
    const payload = request.payload;

    const roomId = payload.room;
    const username = payload.username;

    return await validatorRoom(payload)
        .then(() => {

            return cache.get(roomId);
        })
        .then((cacheRoom) => {

            const room = cacheRoom;

            if (room) {
                const i = room.participants.indexOf(username);
                if (i >= 0) {
                    room.participants.splice(i, 1);
                    return Promise.resolve(room);
                }

                return Promise.reject(Boom.badRequest(spiels.userNotInRoom));
            }

            return Promise.reject(Boom.badRequest(spiels.roomDoesNotExists));
        })
        .then((roomDetails) => {

            const bcastMsg = constructRoomEvent(roomId, roomEvent.leaveRoom, roomDetails.participants);
            websocket.actions.broadcastMsg(JSON.stringify(bcastMsg), [username]);

            return cache.set(roomId, roomDetails);
        })
        .then(() => {

            const statusCode = 200;
            const response = constructBoomOk(statusCode, '');
            return h.response(response).code(statusCode);
        })
        .catch((e) => {

            if (e.isJoi) {
                return Boom.badRequest(e);
            }
            else if (e.isBoom) {
                return e;
            }

            throw new Error(spiels.unexpectedError);
        });
};
