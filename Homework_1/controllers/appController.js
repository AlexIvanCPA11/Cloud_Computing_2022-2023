var Resources  = require('../models/appModel.js');

var { getPostData } = require('../utils.js')

// getResources este pentru toate itemele
async function getResources(req, res)
{
    try
    {
        var resources = await Resources.findAll();
        res.writeHead(200, {'Content-Type' : 'application/json'});
        res.end(JSON.stringify(resources));
    }
    catch (error)
    {
        console.log(error);
    }
}

// getResource este pentru a gasi un item specific
async function getItemResource(req, res, id)
{
    try
    {
        var resource = await Resources.findById(id);
        if(!resource)
        {
            res.writeHead(404, {'Content-Type' : 'application/json'});
            res.end(JSON.stringify({message: 'Item was not found!' }));
        }
        else
        {
            res.writeHead(200, {'Content-Type' : 'application/json'});
            res.end(JSON.stringify(resource));
        }
        
    }
    catch (error)
    {
        console.log(error);
    }
}

// createResource creeaza un Item nou
async function createResource(req, res)
{
    try 
    {
        var body = await getPostData(req);

        var { name } = JSON.parse(body);

        var resource = {
            name
            //description,
            //price
        }

        var newResource = await Resources.create(resource);

        res.writeHead(201, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify(newResource))  ;

    } 
    catch (error) 
    {
        console.log(error);
    }
}

// updateResource updateaza itemul ce il dorim modificat utilizand id-ul sau
async function updateResource(req, res, id) {
    try {
        var resource = await Resources.findById(id)

        if(!resource) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Product Not Found' }))
        } else {
            var body = await getPostData(req)

            var { name } = JSON.parse(body)

            var resourceData = {
                name: name || resource.name,
                //description: description || product.description,
                //price: price || product.price
            }

            const updResource = await Resources.update(id, resourceData)

            res.writeHead(200, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify(updResource)) 
        }
 

    } catch (error) {
        console.log(error)
    }
}

async function deleteResource(req, res, id) {
    try {
        var resource = await Resources.findById(id)

        if(!resource) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Product Not Found' }))
        } else {
            await Resources.remove(id)
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: `Product ${id} removed` }))
        }
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    getResources,
    getItemResource,
    createResource,
    updateResource,
    deleteResource
}