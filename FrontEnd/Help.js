export class Help {
    static newEl(element, roditelj = null, klasa = null) {
        var el = document.createElement(element);
        if (klasa != null) {
            el.className = klasa;
        }
        if (roditelj != null) {
            roditelj.appendChild(el);
        }
        return el;
    }
    static validateString(str) {
        var letters = /^[A-Za-z]+$/;
        if (str < 3 || str > 50) {
            return false;
        }
        if(str.match(letters))
            return true;
        return false;
    }
    static modalScreen() {
        var blackScreen = this.newEl("div", document.body, "grayBack");
        var block = this.newEl("div", blackScreen, "pacijentBlock");
        var X = this.newEl("span", block, "close");
        X.innerHTML = "X";
        X.onclick = () => this.closeModalScreen();
        var innerBlock = this.newEl("div", block);
        return innerBlock;
    }
    static closeModalScreen() {
        document.querySelector(".grayBack").remove();
    }
}