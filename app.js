const express = require('express');
const app = express()
const port = 4000
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
app.use(jsonParser) 
app.use(express.static(__dirname + '/public'));


const dbURL = 'mongodb+srv://giorgi:giorgi@bogcluster.dzhv7.mongodb.net/' + 
    'myFirstDatabase?retryWrites=true&w=majority';
var MongoClient = require('mongodb').MongoClient;
let dbo;
MongoClient.connect(dbURL,{
        useNewUrlParser: true, 
        useUnifiedTopology: true
    }, (err, db) => {
        if (err) throw err;
        dbo = db.db("Bog");
});

app.get('/',  (req, res) => {
    res.sendFile('index.html', {root: __dirname });
});

app.get('/Search', (req, res) => {
    let queryName = req.query.name;
    let queryDep = req.query.department;
    const people = dbo.collection("people");

    let regex = new RegExp(queryName, "gi");
    let regexD = new RegExp(queryDep, "gi");
    let query = { $and: [ 
                            {   
                                $or: [ 
                                    {firstName: {$regex: regex}},
                                    {secondName: {$regex: regex}}
                                ]
                            },
                            {department: {$regex: regexD}}
                        ]
                };
    people.find(query).toArray(function(err, result){
         if(err) throw err;
         res.json({people: result});
    });    
});


app.listen(port, () => {
    console.log(`Search app listening on port ${port}!`);
});

function insertPerson(name, surname, department, img){
    let newPerson = {firstName: name, secondName: surname, img:img, department:department};
    dbo.collection("people").insertOne(newPerson, (err, res)=> {
        if (err) throw err;
        console.log("1 document inserted");
      });
}

