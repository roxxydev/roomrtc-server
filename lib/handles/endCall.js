'use strict';

const Boom = require('boom');


exports.run = async function (request, h) {

    const server = request.server;
    const spiels = server.app.spiels.server;
    const validatorRoom = server.methods.validatorRoom;
    const constructBoomOk = server.methods.constructBoomOkResponse;
    const payload = request.payload;

    return await validatorRoom(payload.msg)
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
