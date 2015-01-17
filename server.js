var Hapi = require('hapi'),
    fs = require('fs'),
    crypto = require('crypto');

var server = new Hapi.Server(),
    port = 3001;

server.connection({port:port});


server.route({
    method: 'POST',
    path: '/upload',
    config: {
        payload: {
            output: 'stream',
            parse: true
        }
    },
    handler: uploadHandler
});


function uploadHandler(request, reply) {
    var hash = crypto.createHash('md5'),
        tStamp = Math.floor(new Date() / 1000),
        remoteAddr = request.info.remoteAddress,
        finalHash = hash.update(tStamp.toString()).update(remoteAddr).digest('hex'),
        file = request.payload['file'],
        fileName = file.hapi.filename,
        extension = fileName.substr(fileName.lastIndexOf('.') + 1),
        saveFile = finalHash + '.' + extension;
    request.payload['file'].pipe(fs.createWriteStream('./files/' + saveFile));

    reply({
        "file":saveFile
    });
}


server.start(function() {
    console.log('Upload service started on port ' + port);
});