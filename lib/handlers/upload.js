/**
 * Created by marshs on 1/30/15.
 */
fs = require('fs'),
    crypto = require('crypto');


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


module.exports = uploadHandler;