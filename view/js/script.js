import {Searcher} from './searcher.js'

const filter = {name: "", department: ""};
const delay = 1000;
let timer = 0;

document.querySelector('employee-desk').addEventListener('search-event', (event) =>{
    if(event.detail.name === 'username'){
        filter.name = event.detail.value;
    } else if(event.detail.name === 'department'){
        filter.department = event.detail.value;
    }
    debounce(filter);
});

function debounce(filter){
    if(timer){
        clearTimeout(timer);
    }
    timer = setTimeout(() => {
        Searcher.fetchData(filter);  
    }, delay);
}

Searcher.fetchData(filter);  //Get all employees when page loads