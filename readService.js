var Hapi = require('hapi'),
    server = new Hapi.Server(),
    port = 3002;

server.connection({port:port});


server.route({
    method: 'GET',
    path: '/get/{name}',
    handler: giveFile
});


function giveFile(request, reply) {
    reply.file('./files/' + request.params.name);
}


server.start(function() {
    console.log('Read service started on port ' + port);
});