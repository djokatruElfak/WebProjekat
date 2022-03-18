import { Help } from "./Help.js";

export class Krevet {
    constructor(x, y, bolnica, pacijent, bolest, doktor, id) {
        this.id = id;
        this.x = x;
        this.y = y;
        if (bolnica != null) {
            this.bolnica = bolnica;
            this.pacijent = pacijent;
            this.bolest = bolest;
            this.doktor = doktor;
            this.prazan = false;
        } else {

            this.prazan = true;
        }
    }

    crtajKrevet(host) {
        if (!host) {
            alert("GRESKA: Neispravna roditeljska klasa!");
            return 0;
        }
        let container = Help.newEl("div", host);
        let krevetNo = Help.newEl("div", container, "krevetNo");
        krevetNo.innerHTML = "Krevet (" + this.x + ", " + this.y + ")";
        if (!this.prazan) {
            let imeDiv = Help.newEl("div", container);
            imeDiv.innerHTML = this.pacijent.ime;
            let prezimeDiv = Help.newEl("div", container);
            prezimeDiv.innerHTML = this.pacijent.prezime;
            let oboljenjeDiv = Help.newEl("div", container);
            oboljenjeDiv.innerHTML = this.bolest.nazivBolesti;
            Help.newEl("br", container);
            let doktorDiv = Help.newEl("div", container, "doktorTekst");
            doktorDiv.innerHTML = this.doktor.ime + " " + this.doktor.prezime;
            host.classList.remove("bgG");
            host.classList.add("bgR");
        } else {
            container.className = "tdDivSlobodno";
            let slobodanDiv = Help.newEl("div", container, "krevetSlobodanTekst");
            slobodanDiv.innerHTML = "Slobodan krevet";
            host.classList.remove("bgR");
            host.classList.add("bgG");
        }
    }

    smestiPacijenta(pacijent, bolest, doktor) {
        this.pacijent = pacijent;
        this.prazan = false;
        this.bolest = bolest;
        this.doktor = doktor;
        this.doktor.brojUzetihPacijenata++;
    }
    async promeniDoktora(doktor) {
        if (doktor != this.doktor) {
            if (doktor.slobodan()) {
                let url = new URL("https://localhost:5001/Krevet/PromeniDoktora/" + this.id);
                url.search = new URLSearchParams({
                    doktorID: doktor.id
                });
                await fetch(url, {
                    method:"PUT"
                }).then(async () => {
                    return new Promise((resolve, reject) => {
                        if (true) {
                          return resolve();
                        } else {
                          return reject();
                       }
                     });
                })
                .catch(res => alert(res));
            } else {
                alert("Doktor nema kapaciteta!");
            }
        }
    }
}