'use strict';


exports.paths = {
    message: '/msg',
    nonExistent: '/{p*}'
};


exports.defaults = {
    host: String('localhost'),
    port: parseInt(process.env.PORT || 8088)
};


exports.spiels = {
    messageBroadcasted: 'Message now broadcasted',
    unexpectedError: 'Oops! Something went wrong',
    apiNonExistent: 'Oops! That\'s not a valid request'
};


exports.config = {
};


exports.app = {
    setup: {
        paths: exports.paths
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
        log: ['log', 'err', 'debug', 'info', 'warning']
    }
};
