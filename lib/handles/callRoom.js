'use strict';

const Boom = require('boom');


exports.run = async function (request, h) {

    const server = request.server;
    const spiels = server.app.spiels.server;
    const validatorCallRoom = server.methods.validateCallRoom;
    const constructBoomOk = server.methods.constructBoomOkResponse;
    const payload = request.payload;

    return await validatorCallRoom(payload.msg)
        .then(() => {

            // TODO Get all participants in the room then broadcast someone is calling
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
