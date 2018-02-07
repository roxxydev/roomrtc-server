'use strict';


exports.paths = {
    message: '/msg',
    enterRoom: '/room/enter',
    leaveRoom: '/room/leave',
    callRoom: '/call',
    answerCall: '/call/answer',
    rejectCall: '/call/reject',
    endCall: '/call/end',
    nonExistent: '/{p*}'
};

exports.roomEventBcast = {
    enterRoom: 'entered',
    leaveRoom: 'leave',
    callRoom: 'calling',
    answerCall: 'accepted',
    rejectCall: 'rejected',
    endCall: 'hangup'
};

exports.defaults = {
    host: String('192.168.254.107') || String('localhost'),
    port: parseInt(process.env.PORT || 8088)
};


exports.spiels = {
    messageBroadcasted: 'Message now broadcasted',
    roomDoesNotExists: 'Room does not exist',
    userNotInRoom: 'You are not in the room',
    unexpectedError: 'Oops! Something went wrong',
    apiNonExistent: 'Oops! That\'s not a valid request'
};


exports.config = {
};


exports.app = {
    setup: {
        paths: exports.paths,
        roomEventBcast: exports.roomEventBcast
    },
    spiels: {
        server: exports.spiels
    },
    config: {
        server: exports.config
    },
    defaults: {
        server: exports.defaults
    }
};


exports.connection = {
    host: exports.defaults.host,
    port: exports.defaults.port
};

exports.log = {
    debug: {
        log: ['i', 'e', 'd', 'w']
    }
};
