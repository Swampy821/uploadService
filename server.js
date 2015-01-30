var Hapi = require('hapi');

var server = new Hapi.Server(),
    port = 3001;

server.connection({port:port});

server = require('./lib/routes.js')(server);


server.start(function() {
    console.log('Upload service started on port ' + port);
});