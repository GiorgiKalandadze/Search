document.getElementById('search').addEventListener('input', event => {
    let name = document.getElementById('search').value;
    let department = document.getElementById('department').value;
    debounce(1000,name, department);
});
document.getElementById('department').addEventListener('input', event => {
    let name = document.getElementById('search').value;
    let department = document.getElementById('department').value;
    debounce(1000,name, department);
});

let timer = 0;
function debounce(delay, name, department){
    if(timer){
        clearTimeout(timer);
    }
    timer = setTimeout(()=>{
        fetchData(name, department)
    }, delay);
}

async function fetchData(name, department){
    let response = await fetch('/Search?' + new URLSearchParams({
        name: name,
        department: department
    }));
    let data = await response.json();
    loadPeople(data.people);
}

function loadPeople(people){
    document.querySelector('.people').innerHTML = '';
    if(people.length < 1){
        let name = document.getElementById('search').value;;
        document.querySelector('.people').innerHTML = `No result:`;
    }
    for(let i = 0; i < people.length; i++){
        let newPerson = generatePerson(people[i]);
        document.querySelector('.people').appendChild(newPerson);
    }
}

function generatePerson(person){
    let imgDiv = document.createElement('div');
    imgDiv.className = 'img-cont';
    let img = document.createElement('img');
    img.src = person.img;
    img.className = 'avatar'
    imgDiv.appendChild(img);
    let nameDiv = document.createElement('div');
    nameDiv.className = "fullName";
    let firstName = document.createElement('p');
    firstName.innerHTML = person.firstName;
    firstName.className = 'firstName';
    let secondName = document.createElement('p');
    secondName.innerHTML = person.secondName;
    secondName.className = 'secondName';
    let department = document.createElement('p');
    department.innerHTML = person.department;
    department.className = 'department';
    nameDiv.appendChild(firstName);
    nameDiv.appendChild(secondName);
    let div = document.createElement('div');
    div.className = 'person';
    div.appendChild(imgDiv);
    div.appendChild(nameDiv);
    div.appendChild(department);
    return div;
}

async function start(){
    let responseAll = await fetch('/Search?' + new URLSearchParams({
        name: "",
    }));
    let dataAll = await responseAll.json();
    loadPeople(dataAll.people);
}
start();
