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
        document.querySelector('.people').innerHTML = '';
        if(people.length < 1){
            document.querySelector('.people').innerHTML = `No result   `;
        }
        for(let i = 0; i < people.length; i++){
            let newPerson = Searcher.generatePerson(people[i]);
            document.querySelector('.people').appendChild(newPerson);
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
