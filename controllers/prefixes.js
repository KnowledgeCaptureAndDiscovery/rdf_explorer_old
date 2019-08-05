
exports.get_prefixes = function(req, res) {
    /*detect the namespace and endpoint*/
    if (!config.has('endpoints.' + namespace)){
        res.statusCode = 404;
        res.send('Not found');
    }
    res.type(resFormat);
    res.send(body);

};