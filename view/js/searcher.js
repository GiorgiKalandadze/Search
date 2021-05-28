class Searcher{

    static fetchData(filter){
        fetch('/Search?' + new URLSearchParams({
            name: filter.name,
            department: filter.department
        })).then((response)=> response.json())
            .then((data) => Searcher.loadPeople(data.people))
        .catch((err)=> console.log(err))
    }
    static loadPeople(people){
        document.querySelector('employee-desk').setInnerHTML('');
        if(people.length < 1){
            document.querySelector('employee-desk').setInnerHTML(`No result`);
            return;
        }
        for(let i = 0; i < people.length; i++){
            let newPerson = Searcher.generatePerson(people[i]);
            document.querySelector('employee-desk').appendEmployee(newPerson);
        }
    }
    static generatePerson(person){
        let employee = document.createElement('employee-card');
        employee.setAttribute("firstname", person.firstName);
        employee.setAttribute("secondname", person.secondName);
        employee.setAttribute("avatar", person.img);
        employee.setAttribute("department", person.department);
        return employee;
    }
}

export  {Searcher}
