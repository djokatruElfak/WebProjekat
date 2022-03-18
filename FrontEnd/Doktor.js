export class Doktor {
    constructor(id, ime, prezime, kapacitet, brojUzetihPacijenata) {
        this.id = id;
        this.ime = ime;
        this.prezime = prezime;
        if (kapacitet != null) {
            this.kapacitet = kapacitet;
        } else {
            this.kapacitet = 20;
        }


        this.brojUzetihPacijenata = brojUzetihPacijenata;
    }

    slobodan() {
        if (this.brojUzetihPacijenata < this.kapacitet) return true;
        return false;
    }
    async izbrisiDoktora() {
        if (this.brojUzetihPacijenata != 0) {
            return false;
        }
        await fetch("https://localhost:5001/Doktor/IzbrisiDoktora/" + this.id, {
            method: "DELETE"
        }).catch(res => {
            console.log(res)
        })
    }
}