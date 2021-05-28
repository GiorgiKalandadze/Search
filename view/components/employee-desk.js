const template = document.createElement('template');
template.innerHTML = 
`
<style>

*{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
.container{
    padding: 30px;
    padding-bottom: 0px;
}

.people{
    padding: 30px;
    padding-top: 20px;
    display: flex;
    flex-wrap: wrap;
}
</style>
<div class="container">
    <search-input type="text" id="search" name="username" placeholder="Name"></search-input>
    <search-input type="text" id="department" name="department" placeholder="Department"></search-input>
</div>
<div class="people"></div>
`

class EmployeeDesk extends HTMLElement {
    static get is(){
        return 'employee-desk';
    }
    constructor(){
        super();
        this.attachShadow({mode:'open'}); 
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        const inputs = this.shadowRoot.querySelectorAll('search-input'); //Set listener to all 'search-input' components. Differ by  name attribute
        inputs.forEach((input) => {
            input.addEventListener('search-input-change', (event) => {
                let newEvent = new CustomEvent("search-event", {
                    detail: {
                        name: event.detail.name,
                        value: event.detail.value   
                    }
                });
                this.dispatchEvent(newEvent);
            }); 
        })

    }
    setInnerHTML(innerHTML){
        this.shadowRoot.querySelector('.people').innerHTML = innerHTML;
    }
    appendEmployee(child){
        this.shadowRoot.querySelector('.people').appendChild(child);
    }
}

window.customElements.define(EmployeeDesk.is, EmployeeDesk);