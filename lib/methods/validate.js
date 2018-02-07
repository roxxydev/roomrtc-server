'use strict';

const Joi = require('joi');


exports.validateId = function (id) {

    const number = parseInt(id);
    const isNumber = Number.isInteger(number) && id.indexOf('.') === -1;
    return Promise.resolve(isNumber);
};

exports.validateRoom = async function (data) {

    const schema = {
        room: Joi.string().required(),
        username: Joi.string().required()
    };

    return await Joi.validate(data, schema);
};

exports.validateCallRoom = async function (data) {

    const schema = {
        room: Joi.string().required(),
        username: Joi.string().required(),
        sdpOffer: Joi.string().required()
    };

    return await Joi.validate(data, schema);
};

exports.validateAnswerCall = async function (data) {

    const schema = {
        room: Joi.string().required(),
        username: Joi.string().required(),
        sdpAnswer: Joi.string().required()
    };

    return await Joi.validate(data, schema);
};
