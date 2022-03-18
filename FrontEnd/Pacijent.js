export class Pacijent {
    constructor(ime, prezime,id, godinaRodjenja, dodatneInfo) {
        this.id = id;
        this.ime = ime;
        this.prezime = prezime;
        if (godinaRodjenja != null) {
        this.godinaRodjenja = godinaRodjenja;
        }
        else {
            this.godinaRodjenja = 1990;
        }
        if (dodatneInfo != null) {
        this.dodatneInfo = dodatneInfo;
        } else {
            this.dodatneInfo = "";
        }
    }

    async promeniPodatke(ime, prezime, godinaRodjenja, dodatneInfo) {
        this.ime = ime;
        this.prezime = prezime;
        this.godinaRodjenja = godinaRodjenja;
        this.dodatneInfo = dodatneInfo;
        let url = new URL("https://localhost:5001/Pacijent/PromeniPacijenta/" + this.id);
        url.search = new URLSearchParams({
            Ime: ime,
            Prezime: prezime,
            godinaRodjenja,
            dodatneInfo
        });
        await fetch(url, {
            method: "PUT"
        }).catch((res) => alert(res));
    }
}