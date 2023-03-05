var fs = require('fs');

function writeDataToFile(filename, content) 
{
    fs.writeFileSync(filename, JSON.stringify(content), 'utf8', (err) => {
        if(err) {
            console.log(err)
        }
    })
}

function getPostData(req) {
    return new Promise((resolve, reject) => {
        try {
            var body = ''

            req.on('data', (chunk) => {
                body += chunk.toString()
            })

            req.on('end', () => {
                if(Object.keys(body).length === 0)
                {
                    var  exitLoop = 'stop_loop';
                    resolve(exitLoop);
                }
                else
                {
                    resolve(body);
                }
            })
        } catch (error) {
            reject(error)
        }
    })
}

function getNextMaxID(jsonFile)
{
    return (Math.max.apply(Math, jsonFile.map(function(o) {
        return o.id;
      })) + 1);
}

module.exports = {
    writeDataToFile,
    getPostData,
    getNextMaxID
}