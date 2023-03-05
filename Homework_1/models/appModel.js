var resources = require('../dataJSON/resurse_stocate.json');

var { writeDataToFile, getNextMaxID } = require('../utils.js');

function findAll()
{
    return new Promise((resolve, reject) =>
    {
        resolve(resources);
    });
}

function findById(id)
{
    return new Promise((resolve, reject) => {
        var resource = resources.find((p) => p.id=== id);
        resolve(resource);
    });
}


function create(resource)
{
    return new Promise((resolve, reject) =>
    {
        var newResource = {id: String(getNextMaxID(resources)), ...resource};
        resources.push(newResource);
        writeDataToFile('./dataJSON/resurse_stocate.json', resources);
        resolve(newResource);
    });
}



function update(id, itemResource) {
    return new Promise((resolve, reject) => {
        var index = resources.findIndex((p) => p.id === id);
        resources[index] = {id, ...itemResource};
            writeDataToFile('./dataJSON/resurse_stocate.json', resources);
        resolve(resources[index]);
    });
}

function remove(id) {
    return new Promise((resolve, reject) => {
        resources = resources.filter((p) => p.id !== id);
            writeDataToFile('./dataJSON/resurse_stocate.json', resources);
        resolve();
    });
}


module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
};