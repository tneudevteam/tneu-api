const schemas = require('./schemas');
const authAction = require('./actions/auth');
const getAction = require('./actions/get');

module.exports = function () {
    const seneca = this;

    seneca.add({ role: 'scores', cmd: 'auth' }, authAction, {
        parambulator: schemas.auth
    });

    seneca.add({ role: 'scores', cmd: 'get' }, getAction, {
        parambulator: schemas.get
    });
};
