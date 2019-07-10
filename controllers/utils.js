const config  = require('config');

function matcher(uri){
    uri = uri.replace("/data", "")
    console.log(uri)
    let myArray =  config.get("endpoints.enabled")

    for (let namespace of myArray) {
        base = config.get('endpoints.' + namespace + '.base')
        path = config.get('endpoints.' + namespace + '.path')
        console.log("try match with: " + uri + " - " + path)
        if(uri.includes(path)){
            console.log("match with: " + namespace)
            return namespace
        }
    }
}

module.exports ={
    matcher:matcher,
}
