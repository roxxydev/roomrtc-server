'use strict';


const constructBoomOkResponse = (responsePayloadCode, responsePayloadMessage) => {

    const code = responsePayloadCode ? responsePayloadCode : 200;
    const msg = responsePayloadMessage ? responsePayloadMessage : '';

    const response = {
        statusCode: code,
        message: msg
    };

    return response;
};

exports.load = () => {

    const methods = [{
        name: 'constructBoomOkResponse',
        method: constructBoomOkResponse,
        options: {}
    }];

    return methods;
};
