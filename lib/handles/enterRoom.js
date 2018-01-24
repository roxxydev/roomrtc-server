'use strict';

const Boom = require('boom');



exports.run = async function (request, h) {

    const server = request.server;
    const websocket = server.app.websocket;
    const cache = server.app.cache;
    const spiels = server.app.spiels.server;
    const broadcastType = server.app.setup.broadcast;
    const constructBoomOk = server.methods.constructBoomOkResponse;
    const validatorRoom = server.methods.validateRoom;
    const constructRoom = server.methods.constructRoom;
    const constructRoomEvent = server.methods.constructRoomEvent;
    const payload = request.payload;

    const roomId = payload.room;
    const username = payload.username;

    return await validatorRoom(payload)
        .then(() => {

            return cache.get(roomId);
        })
        .then((cacheRoom) => {

            let room = cacheRoom;

            if (room) {
                if (!room.participants.includes(username)) {
                    room.participants.push(username);
                }
            }
            else {
                room = constructRoom(roomId, username);
            }

            return Promise.resolve(room);
        })
        .then((roomDetails) => {

            return cache.set(roomId, roomDetails);
        })
        .then(() => {

            // Broadcast to other websocket clients that new user entered the room
            const bcastMsg = constructRoomEvent(roomId, broadcastType.enterRoom);
            websocket.actions.broadcastMsg(JSON.stringify(bcastMsg), [username]);

            const statusCode = 200;
            const response = constructBoomOk(statusCode, '');
            return h.response(response).code(statusCode);
        })
        .catch((e) => {

            if (e.isJoi) {
                return Boom.badRequest(e);
            }

            throw new Error(spiels.unexpectedError);
        });
};
