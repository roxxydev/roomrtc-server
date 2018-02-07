'use strict';

const Validate = require('./methods/validate');
const Construct = require('./methods/construct');

exports.load = () => {

    const methods = [
        {
            name: 'constructBoomOkResponse',
            method: Construct.constructBoomOkResponse,
            options: {}
        },
        {
            name: 'constructRoomEvent',
            method: Construct.constructRoomEvent,
            options: {}
        },
        {
            name: 'constructRoomEventSdp',
            method: Construct.constructRoomEventSdp,
            options: {}
        },
        {
            name: 'validateRoom',
            method: Validate.validateRoom,
            options: {}
        },
        {
            name: 'validateCallRoom',
            method: Validate.validateCallRoom,
            options: {}
        },
        {
            name: 'validateAnswerCall',
            method: Validate.validateAnswerCall,
            options: {}
        }];

    return methods;
};
