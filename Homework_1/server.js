var http = require('http'); 


var {   getResources,
        getItemResource,
        createResource,
        updateResource,
        deleteResource
    } = require('./controllers/appController.js');

var server = http.createServer((req, res) => {  
    if (req.url === '/api/resources' && req.method === 'GET')
    {
        getResources(req, res);
    }
    else if (req.url.match(/\/api\/resources\/\w+/) && req.method === 'GET') 
    {
        var id = req.url.split('/')[3];
        getItemResource(req, res, id);
    }
    else if (req.url === '/api/resources' && req.method === 'POST')
    {
        createResource(req, res);
    }
    else if (req.url.match(/\/api\/resources\/\w+/) && req.method === 'PUT') 
    {
        var id = req.url.split('/')[3];
        updateResource(req, res, id);
    }
    else if (req.url.match(/\/api\/resources\/\w+/) && req.method === 'DELETE') 
    {
        var id = req.url.split('/')[3];
        deleteResource(req, res, id);
    }
    else
    {
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({message: 'Route not found'}));
    }
});

server.listen(5000);

console.log('Node.js web server at port 5000 is running..');