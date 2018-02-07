'use strict';

exports.constructBoomOkResponse = (responsePayloadCode, responsePayloadMessage) => {

    const code = responsePayloadCode ? responsePayloadCode : 200;
    const msg = responsePayloadMessage ? responsePayloadMessage : '';

    const response = {
        statusCode: code,
        message: msg
    };

    return response;
};

exports.constructRoomEvent = (roomId, roomEventType, participants) => {

    return {
        room: roomId,
        roomEvent: roomEventType,
        participants: participants
    };
};

exports.constructRoomEventSdp = (roomId, roomEventType, participants, sdp, isOffer) => {

    const roomEvent = exports.constructRoomEvent(roomId, roomEventType, participants);

    if (isOffer) {
        Object.assign(roomEvent, {
            sdpOffer: sdp
        });
    }
    else {
        Object.assign(roomEvent, {
            sdpAnswer: sdp
        });
    }

    return roomEvent;
};
