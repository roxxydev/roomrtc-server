'use strict';

const Boom = require('boom');


exports.run = async function (request, h) {

    const server = request.server;
    const websocket = server.app.websocket;
    const cache = server.app.cache;
    const spiels = server.app.spiels.server;
    const roomEvent = server.app.setup.roomEventBcast;
    const constructBoomOk = server.methods.constructBoomOkResponse;
    const validatorRoom = server.methods.validateRoom;
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
            const participants = room ? room.participants : [];

            if (!participants.includes(username)) {
                participants.push(username);
            }

            room = constructRoomEvent(roomId, roomEvent.enterRoom, participants);

            return Promise.resolve(room);
        })
        .then((roomDetails) => {

            // Broadcast to other websocket clients that new user entered the room
            const bcastMsg = constructRoomEvent(roomId, roomEvent.enterRoom, roomDetails.participants);
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

            throw new Error(spiels.unexpectedError);
        });
};
