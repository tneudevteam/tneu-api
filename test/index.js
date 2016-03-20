'use strict';

const Code = require('code');
const Lab = require('lab');

const lab = exports.lab = Lab.script();
const expect = Code.expect;
const Seneca = require('seneca');

lab.experiment('Action: role: scores, cmd: auth', () => {
    let seneca;

    lab.beforeEach((done) => {
        seneca = Seneca({ log: 'silent' });
        seneca.use('../scores');
        done();
    });

    lab.test('Returns an error on wrong credentials', (done) => {
        const wrongCrenetials = { username: 'qweqwe', password: 'qweqwe' };

        seneca.error(done).act('role: scores, cmd: auth', wrongCrenetials, (error, response) => {
            expect(error).to.not.exist();
            expect(response).to.be.an.object();
            expect(response.success).to.be.false();
            expect(response.reason).to.be.a.string();
            done();
        });
    });
});
