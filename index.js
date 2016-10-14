const restify = require('restify');
const server = restify.createServer({name: 'scores-microservice'});
const seneca = require('seneca')()
  .use('./scores')
  .listen({host: '0.0.0.0', port: 1983})
  .ready(() => {
    server.listen(9101, () => {
      console.log('%s has been started at %s', server.name, server.url);
    });
  });

server.pre(restify.pre.userAgentConnection());
server.use(restify.queryParser());
server.use(restify.throttle({
  burst: 10,
  rate: 3,
  ip: true
}));
server.use(restify.CORS());

server.get('/scores', (request, response, next) => {
  const act = request.query.act;

  if (act === 'auth') {
    const username = request.query.username;
    const password = request.query.password;

    seneca.act({
      role: 'scores',
      cmd: 'auth',
      username,
      password
    }, (error, results) => {
      if (error) {
        response.json(403, {error});
        return next();
      }

      response.charSet('utf-8');
      response.json(results);
      return next();
    });
  } else if (act === 'get') {
    const token = request.query.token;

    seneca.act({
      role: 'scores',
      cmd: 'get',
      token
    }, (error, results) => {
      if (error) {
        response.json(403, {error});
        return next();
      }

      response.charSet('utf-8');
      response.json(results);
      return next();
    });
  } else {
    return next();
  }
});
