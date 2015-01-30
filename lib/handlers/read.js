/**
 * Created by marshs on 1/30/15.
 */
function giveFile(request, reply) {
    reply.file('./files/' + request.params.name);
}

module.exports = giveFile;