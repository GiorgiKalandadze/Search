const template = document.createElement('template');
template .innerHTML = 
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
    padding: 3px;
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
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.querySelector('input').addEventListener('input', (event) => {
            let newEvent = new CustomEvent("search-input-change", {
                detail: {
                    name: this.getAttribute("name"),
                    value: event.target.value   
                }
            });
            this.dispatchEvent(newEvent);
        }); 
    }
    attributeChangedCallback(name, oldValue, newValue) {
        this.shadowRoot.querySelector('input').setAttribute(name, newValue);
    }  
    static get observedAttributes() { return ['type', 'id', 'name', 'placeholder']; } 
}

window.customElements.define(SeachInput.is, SeachInput);