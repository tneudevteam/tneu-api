const schemas = require('./schemas');
const authAction = require('./actions/auth');

module.exports = function () {
    const seneca = this;

    seneca.add({ role: 'scores', cmd: 'auth' }, authAction, {
        parambulator: schemas.auth
    });
};
