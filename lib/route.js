'use strict';

const Config = require('./config');
const NonExistent = require('./handles/nonExistent');
const EnterRoom = require('./handles/enterRoom');
const LeaveRoom = require('./handles/leaveRoom');
const CallRoom = require('./handles/callRoom');
const AnswerCall = require('./handles/answerCall');
const RejectCall = require('./handles/rejectCall');
const EndCall = require('./handles/endCall');
const IceCandidate = require('./handles/iceCandidate');
const BroadcastMessage = require('./handles/broadcastMsg');


exports.load = [
    { path: Config.paths.nonExistent, method: '*', handler: NonExistent.run, options: { cors: true }},
    { path: Config.paths.enterRoom, method: 'POST', handler: EnterRoom.run, options: { cors: true }},
    { path: Config.paths.leaveRoom, method: 'POST', handler: LeaveRoom.run, options: { cors: true }},
    { path: Config.paths.callRoom, method: 'POST', handler: CallRoom.run, options: { cors: true }},
    { path: Config.paths.answerCall, method: 'POST', handler: AnswerCall.run, options: { cors: true }},
    { path: Config.paths.rejectCall, method: 'POST', handler: RejectCall.run, options: { cors: true }},
    { path: Config.paths.endCall, method: 'POST', handler: EndCall.run, options: { cors: true }},
    { path: Config.paths.iceCandidate, method: 'POST', handler: IceCandidate.run, options: { cors: true }},
    { path: Config.paths.message, method: 'POST', handler: BroadcastMessage.run, options: { cors: true }}
];
