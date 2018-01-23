'use strict';

const Config = require('./config');
const NonExistent = require('./handles/nonExistent');
const BroadcastMessage = require('./handles/broadcastMsg');


exports.load = [
    { path: Config.paths.nonExistent, method: '*', handler: NonExistent.run },
    { path: Config.paths.message, method: 'POST', handler: BroadcastMessage.run }
];
