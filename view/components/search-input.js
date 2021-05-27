const template2 = document.createElement('template');
template2 .innerHTML = 
`
<style>

*{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

input{
    display: block;
    margin-bottom: 10px;
    width: 200px;
    border-radius: 5px;
    font-size: 17px;
    outline: none;
}
.btn{
    width: 100px;
    border-radius: 20px;
    background-color: orange;
    outline: none;
    border:none;
    opacity: 0.8;
    color: white;
    font-size: 17px;
}
.btn:hover{
    cursor: pointer;
    opacity: 1;
}
</style>

<input type="text" id="" name="" placeholder=""/>
`

class SeachInput extends HTMLElement {
    static get is(){
        return 'search-input';
    }
    constructor(){
        super();
        this.attachShadow({mode:'open'}); 
        this.shadowRoot.appendChild(template2.content.cloneNode(true));
        this.shadowRoot.querySelector('input').addEventListener('input', (event) => {
            let newEvent = new CustomEvent("search-input-change", {
                detail: {
                    value: event.target.value   
                }
            });
            this.dispatchEvent(newEvent);
        }); 
    }
    connectedCallback() {
    
    }
    attributeChangedCallback(name, oldValue, newValue) {
        this.shadowRoot.querySelector('input').setAttribute(name, newValue);
    }  
    static get observedAttributes() { return ['type', 'id', 'name', 'placeholder']; } 
}

window.customElements.define(SeachInput.is, SeachInput);