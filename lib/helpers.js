/*
* Helpers for various tasks
* */

// Dependencies
const crypto = require('crypto');
const config = require('./config');

const helpers = {};

// create a SHA256 hash
helpers.hash = (str) => {
    if (typeof (str) === 'string' && str.length > 0){
        return crypto.createHmac('sha256', config.hashingSecret).update(str).digest('hex');
    } else {
        return false;
    }
};

// Parse a JSON string to an object in all cases, without throwing
helpers.parseJsonToObject = (str) => {
    try {
        return JSON.parse(str)
    } catch (e) {
        return {}
    }
};

module.exports = helpers;


