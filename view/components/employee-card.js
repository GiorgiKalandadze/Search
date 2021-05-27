const template = document.createElement('template');
template.innerHTML = 
`
<style>

*{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
.person{
    border: 1px solid black;
    width: 300px;
    height: 350px;
    margin-right: 10px;
    margin-bottom: 10px;
}
.avatar-container{
    width: 100%;
    height: 290px;
    overflow-y: hidden;
    margin-bottom: 10px;
}
.avatar{
    width: 100%;
}
.fullName{
    margin-left: 5px;
    margin-bottom: 5px;
    display: flex;
}
.firstname{
    margin-right: 5px;
}
.department{
    margin-left: 5px;
}
</style>

<div class="person">
    <div class="avatar-container">
        <img class="avatar"/>
    </div>
    <div class="fullName">
        <div class="firstname"></div>
        <div class="secondname"></div>
    </div>
    <div class="department"></div>
</div>
`

class EmployeeCard extends HTMLElement {
    static get is(){
        return 'employee-card';
    }
    constructor(){
        super();
        this.attachShadow({mode:'open'}); 
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
    connectedCallback() {
    
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if(name === 'avatar'){
            this.shadowRoot.querySelector(`.${name}`).src = newValue;
        } else {
            this.shadowRoot.querySelector(`.${name}`).innerHTML = newValue;
        }
    }  
    static get observedAttributes() { return ['firstname', 'secondname', 'avatar', 'department']; } 
}

window.customElements.define(EmployeeCard.is, EmployeeCard);