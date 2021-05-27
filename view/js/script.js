const filter = {name: "", department: ""};
const delay = 1000;
let timer = 0;

document.getElementById('search').addEventListener('search-input-change', event => {
    filter.name = event.detail.value;
    debounce(filter);
});
document.getElementById('department').addEventListener('search-input-change', event => {
    filter.department = event.detail.value;
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