## RDF Explorer

RDF explorer is a Linked Data Frontend for SPARQL Endpoints

### How to run 

Using docker-compose:

```shell
$ docker-compose up -d
```

Or you can only docker cmd: 

```shell
docker run -d --name rdf_explorer -e "NODE_ENV=production" -p 7070:7070 kcapd/explorer
```

### Add new endpoint

You should create a entry in the config. For example, this is the configuration for the mint endpoint:


```json
  "endpoints": {
    "mint": {
      "endpointQuery": "http://ontosoft.isi.edu:3030/ds/query",
      "base": "https://w3id.org"
    }
```

### How to use

You can visit the webpage of a resource. For example, the resource PIHM of MINT Catalog [http://<your_server>:<your_port>/mint/instance/PIHM](http://ontosoft.isi.edu:7070/mint/instance/pihm)


Or you can obtain the triples. For example, an execution of OPMW

```shell
$ curl -L -H "Accept: text/turtle" http://www.opmw.org/export/resource/WorkflowExecutionArtifact/Caesar_Cypher-1f-f788bcd8-75d9-4996-974d-ef6a442a36da_EncryptedDocument
```

The explorer supports;

- text/turtle 
- application/ld+json
- application/rdf+xml
- application/n-triples