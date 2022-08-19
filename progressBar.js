class ProgressBar extends HTMLElement {
    static css = `
        :host {
            display: block;
            width: 250px;
            background: #eeeeee;
            border-radius: 4px;
            overflow: hidden;
        }

        .fill {
            width: 50%;
            height: 100%;
            background: #009578;
            transition: width 0.25s;
        }
    `
    
    constructor() {
        super();

        this.attachShadow({ mode: "open" });        

        const style = document.createElement("style");
        const fill = document.createElement("div");

        style.innerHTML = ProgressBar.css;
        fill.classList.add("fill");

        this.shadowRoot.append(style, fill);

    }
}

customElements.define("progress-bar", ProgressBar);