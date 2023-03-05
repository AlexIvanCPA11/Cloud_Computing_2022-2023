var Resources  = require('../models/appModel.js');

var { getPostData } = require('../utils.js');

var { product_names, manufacturer_names} = require('../dataJSON/manufacturesNames.js');


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

        if(body === 'stop_loop')
        {
            var randomResource =
            {
                name : product_names[Math.floor(Math.random() * product_names.length)],
                model : ((Math.random() + 1).toString(36).substring(7)).toUpperCase(),
                manufacturer : manufacturer_names[Math.floor(Math.random() * manufacturer_names.length)],
                quantity : Math.round(Math.random() * (3700 - 5 + 1) + 5),
                unit_cost : (Math.random() * (2500 - 17 + 1) + 17).toFixed(4),
            }

            var newRandomResource = await Resources.create(randomResource);

            res.writeHead(201, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify(newRandomResource))  ;
        }
        else
        {
            var { name, model, manufacturer, quantity, unit_cost } = JSON.parse(body);

            var resource = {
                name,
                model,
                manufacturer,
                quantity,
                unit_cost
            }

            var newResource = await Resources.create(resource);

            res.writeHead(201, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify(newResource))  ;
        }
            
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

            var { name, model, manufacturer, quantity, unit_cost  } = JSON.parse(body)

            var resourceData = {
                name: name || resource.name,
                model: model || resource.model,
                manufacturer: manufacturer || resource.manufacturer,
                quantity: quantity || resource.quantity,
                unit_cost: unit_cost || unit_cost.manufacturer
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