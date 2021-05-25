const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const Connection = require('./model/connection');
const Manager = require('./model/manager');
const Config = require('./model/config');
app.use(jsonParser) 
app.use(express.static(__dirname + '/view'));


const configInfo = {
    port: 4000,
    dbURL : 'mongodb+srv://giorgi:giorgi@bogcluster.dzhv7.mongodb.net/' + 
    'myFirstDatabase?retryWrites=true&w=majority',
    dataBaseName: "Bog",
    collectionName : "people"
}
Config.set(configInfo);

const MongoClient = require('mongodb').MongoClient;
MongoClient.connect(Config.dbURL,{
        useNewUrlParser: true, 
        useUnifiedTopology: true
    }, (err, client) => {
        if (err) {
            console.error(err);
            return;
        }
        Connection.set(client.db(Config.dataBaseName));
});
Manager.set("people");



app.get('/Search', (req, res) => {
    const employees = Manager.findEmployee(req.query); //Cursor returned. Need toArray to have  array of documents.
    employees.toArray((err, result) => {
            if(err) {
                console.error(err);
                return;
            }
            res.json({people: result});
    });    
});
app.get('/*',  (req, res) => {
    res.sendFile('index.html', {root: __dirname });
});


app.listen(Config.port, () => {
    console.log(`Search app listening on port ${Config.port}!`);
});

