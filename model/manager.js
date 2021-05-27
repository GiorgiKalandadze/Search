const Connection = require("./connection");

class Manager{
    static set(collection){
        Manager._collection = collection;
    }
    static get collection(){
        return Manager._collection;
    }
    static findEmployee(params){
        const queryName = params.name;
        const queryDep = params.department;
        const people = Connection.db.collection(Manager.collection);
        const regexName = new RegExp(queryName, "gi");
        const regexDep = new RegExp(queryDep, "gi");
        const query = { $and: [ 
                                {   
                                    $or: [ 
                                        {firstName: {$regex: regexName}},
                                        {secondName: {$regex: regexName}}
                                    ]
                                },
                                {department: {$regex: regexDep}}
                            ]
                    };
        return people.find(query); //Returns cursor.
    }
    
    static addEmployee(employee){
        const newPerson = {firstName: employee.name, secondName: employee.surname, img:employee.img, department:employee.department};
        Connection.db.collection(Manager.collection).insertOne(newPerson, (err, res) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log("Employee Inserted");
          });
    }
}

module.exports = Manager;