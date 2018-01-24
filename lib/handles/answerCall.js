'use strict';

const Boom = require('boom');


exports.run = async function (request, h) {

    const server = request.server;
    const spiels = server.app.spiels.server;
    const validatorAnswerCall = server.methods.validateAnswerCall;
    const constructBoomOk = server.methods.constructBoomOkResponse;
    const payload = request.payload;

    return await validatorAnswerCall(payload.msg)
        .then(() => {

            // TODO Send the answer to the caller
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
