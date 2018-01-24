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

exports.constructRoom = (room, ...participants) => {

    return {
        room: room,
        participants: participants
    };
};

exports.constructRoomEvent = (roomId, roomEventType) => {

    return {
        room: roomId,
        roomEvent: roomEventType
    };
};

exports.constructRoomEventSdp = (roomId, roomEventType, sdp, isOffer) => {

    const roomEvent = exports.constructRoom(roomId, roomEventType);

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
