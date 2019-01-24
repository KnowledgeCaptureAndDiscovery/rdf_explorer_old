const config  = require('config');
const request = require('request')
const queryEndpoint = config.get('sparql.endpointDescribe');
const serverURL     = config.get('server.url');

function replaceURI(uri, serverURL){
    return uri.replace(serverURL,"https://w3id.org");
}

exports.data_show = function(req, res) {
    path = req.originalUrl.replace("data/", "")
    url = serverURL + path;
    url = replaceURI(url, serverURL)
    url = url.replace('instance/', 'instance#')
    resFormat = req.accepts(['text/turtle', 'application/ld+json', 'application/rdf+xml', 'application/n-triples'])
    var q = 'DESCRIBE <' + url + '>';
    console.log(q)
        request.post(
            queryEndpoint, 
            { 
                form: {format: resFormat, query: q}
            },
            function (err, rcode, body) {
                res.type(resFormat);
                res.send(body);
            }
        );
};