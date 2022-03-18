import { Help } from "./Help.js";
import { Krevet } from "./Krevet.js";
import { Doktor } from './Doktor.js';
import { Bolest } from './Bolest.js';
import { Pacijent } from './Pacijent.js';


export class Bolnica {

    constructor(naziv, duzina, sirina, id) {
        this.id = id
        this.naziv = naziv;
        this.sirina = sirina;
        this.duzina = duzina;
        this.matrica = [...Array(this.sirina)].map(x => Array(this.duzina).fill(null));
        this.kapacitet = 0;
        this.doktori = [];
        this.bolesti = [];
        this.host = null;
    }

    crtajBolnicu(host) {
        if (!host) {
            alert("GRESKA: Neispravna roditeljska klasa!");
            return 0;
        }
        if (this.host == null) {
            var glavniContainer = Help.newEl("div", host, "glavniContainer");
            this.host = glavniContainer;
        } else {
            glavniContainer = this.host;
        }

        let glavniDiv = Help.newEl("div", glavniContainer, "glavniDiv");
        let izmeneDiv = Help.newEl("div", glavniDiv, "izmeneDiv");

        // 1. DODAJ PACIJENTA FORMA

        let dodajPacForma = Help.newEl("form", izmeneDiv, "formDiv");
        let labelaDodajPac = Help.newEl("label", dodajPacForma, "heading");
        labelaDodajPac.innerHTML = "Dodaj pacijenta";

        Help.newEl("br", dodajPacForma);

        //  1.1 Ime i prezime

        let labelaDodajPacIme = Help.newEl("label", dodajPacForma);
        labelaDodajPacIme.innerHTML = "Ime: ";

        let inputDodajPacIme = Help.newEl("input", dodajPacForma);
        inputDodajPacIme.type = "text";
        inputDodajPacIme.placeholder = "Ime pacijenta";

        Help.newEl("br", dodajPacForma);

        let labelaDodajPacPrezime = Help.newEl("label", dodajPacForma);
        labelaDodajPacPrezime.innerHTML = "Prezime: "

        let inputDodajPacPrezime = Help.newEl("input", dodajPacForma);
        inputDodajPacPrezime.type = "text";
        inputDodajPacPrezime.placeholder = "Prezime pacijenta";


        // 1.2 Bolesti (radio buttons)
        let labelaDodajPacBolesti1 = Help.newEl("label", dodajPacForma);
        labelaDodajPacBolesti1.innerHTML = "Kovid";
        let radioDodajPacBolesti1 = Help.newEl("input", dodajPacForma);
        radioDodajPacBolesti1.type = "radio";
        radioDodajPacBolesti1.name = "dodajPacBolest";

        Help.newEl("br", dodajPacForma);

        let labelaDodajPacBolesti2 = Help.newEl("label", dodajPacForma);
        labelaDodajPacBolesti2.innerHTML = "Prehlada";
        let radioDodajPacBolesti2 = Help.newEl("input", dodajPacForma);
        radioDodajPacBolesti2.type = "radio";
        radioDodajPacBolesti2.name = "dodajPacBolest";

        Help.newEl("br", dodajPacForma);

        let labelaDodajPacBolesti3 = Help.newEl("label", dodajPacForma);
        labelaDodajPacBolesti3.innerHTML = "Alergija";
        let radioDodajPacBolesti3 = Help.newEl("input", dodajPacForma);
        radioDodajPacBolesti3.type = "radio";
        radioDodajPacBolesti3.name = "dodajPacBolest";

        Help.newEl("br", dodajPacForma);

        // 1.3 Doktor
        let labelaDodajPacDoktor = Help.newEl("label", dodajPacForma);
        labelaDodajPacDoktor.innerHTML = "Doktor: ";

        let selectDodajPacDoktor = Help.newEl("select", dodajPacForma);
        selectDodajPacDoktor.name = "dodajPacDoktor";
        let optionEmptyDodajPacDoktor = Help.newEl("option", selectDodajPacDoktor);
        optionEmptyDodajPacDoktor.innerHTML = "Izaberite";
        optionEmptyDodajPacDoktor.value = "-1";

        for (let i = 0; i < this.doktori.length; i++) {
            if (this.doktori[i].slobodan()) {
                let optionDodajPacDoktor = Help.newEl("option", selectDodajPacDoktor);
                optionDodajPacDoktor.value = i;
                optionDodajPacDoktor.innerHTML = this.doktori[i].ime + " " + this.doktori[i].prezime;
            }
        }

        Help.newEl("br", dodajPacForma);

        // 1.4 pozicija
        //      X
        let labelaDodajPacX = Help.newEl("label", dodajPacForma);
        labelaDodajPacX.innerHTML = "X";
        let selectDodajPacX = Help.newEl("select", dodajPacForma);
        selectDodajPacX.name = "dodajPacX";
        let optionEmptyDodajPacX = Help.newEl("option", selectDodajPacX);
        optionEmptyDodajPacX.value = "-1";

        for (let i = 0; i < this.duzina; i++) {
            let optionDodajPacX = Help.newEl("option", selectDodajPacX);
            optionDodajPacX.innerHTML = i;
            optionDodajPacX.value = i;
        }
        //      Y
        let labelaDodajPacY = Help.newEl("label", dodajPacForma);
        labelaDodajPacY.innerHTML = "Y";
        let selectDodajPacY = Help.newEl("select", dodajPacForma);
        selectDodajPacY.name = "dodajPacY";
        let optionEmptyDodajPacY = Help.newEl("option", selectDodajPacY);
        optionEmptyDodajPacY.value = "-1";

        for (let i = 0; i < this.sirina; i++) {
            let optionDodajPacY = Help.newEl("option", selectDodajPacY);
            optionDodajPacY.innerHTML = i;
            optionDodajPacY.value = i;
        }

        Help.newEl("br", dodajPacForma);

        // 1.5 SUBMIT
        let submitDodajPac = Help.newEl("input", dodajPacForma);
        submitDodajPac.type = "submit";


        // 1.6 PARSE

        dodajPacForma.onsubmit = (event) => {
            event.preventDefault();
            let RadioBtns = [radioDodajPacBolesti1, radioDodajPacBolesti2, radioDodajPacBolesti3];
            let oboljenje;
            let selektovano = 0;
            let bolesti = ["Kovid", "Prehlada", "Alergija"]

            RadioBtns.forEach((item, index) => {
                if (item.checked) {
                    oboljenje = bolesti[index];
                    selektovano = 1;
                }
            });

            let formaSlanje = {
                ime: inputDodajPacIme.value,
                prezime: inputDodajPacPrezime.value,
                selektovano,
                oboljenje,
                doktor: this.doktori[selectDodajPacDoktor.value],
                x: selectDodajPacX.value,
                y: selectDodajPacY.value
            };

            this.dodajPacijentaForm(event, formaSlanje);
        }



        // 2. OTPUSTI PACIJENTA

        let OtpustiPacForma = Help.newEl("form", izmeneDiv, "formDiv");
        let labelaOtpustiPac = Help.newEl("label", OtpustiPacForma, "heading");
        labelaOtpustiPac.innerHTML = "Otpusti pacijenta";

        Help.newEl("br", OtpustiPacForma);

        // 2.1 pozicija
        //      X
        let labelaOtpustiPacX = Help.newEl("label", OtpustiPacForma);
        labelaOtpustiPacX.innerHTML = "X";
        let selectOtpustiPacX = Help.newEl("select", OtpustiPacForma);
        selectOtpustiPacX.name = "OtpustiPacX";
        let optionEmptyOtpustiPacX = Help.newEl("option", selectOtpustiPacX);
        optionEmptyOtpustiPacX.value = "-1";

        for (let i = 0; i < this.duzina; i++) {
            var optionOtpustiPacX = Help.newEl("option", selectOtpustiPacX);
            optionOtpustiPacX.innerHTML = i;
            optionOtpustiPacX.value = i;
        }
        //      Y
        var labelaOtpustiPacY = Help.newEl("label", OtpustiPacForma);
        labelaOtpustiPacY.innerHTML = "Y";
        var selectOtpustiPacY = Help.newEl("select", OtpustiPacForma);
        selectOtpustiPacY.name = "OtpustiPacY";
        var optionEmptyOtpustiPacY = Help.newEl("option", selectOtpustiPacY);
        optionEmptyOtpustiPacY.value = "-1";

        for (let i = 0; i < this.sirina; i++) {
            let optionOtpustiPacY = Help.newEl("option", selectOtpustiPacY);
            optionOtpustiPacY.innerHTML = i;
            optionOtpustiPacY.value = i;
        }

        Help.newEl("br", OtpustiPacForma);

        // 2.2 SUBMIT
        let submitOtpustiPac = Help.newEl("input", OtpustiPacForma);
        submitOtpustiPac.type = "submit";


        // 2.3 PARSE
        submitOtpustiPac.onclick = (event) => {
            event.preventDefault();
            let formaOtpusti = {
                x: selectOtpustiPacX.value,
                y: selectOtpustiPacY.value
            }
            this.otpustiPacijentaForm(formaOtpusti);
        }


        // 3. DODAJ DOKTORA

        let dodajDoktoraForma = Help.newEl("form", izmeneDiv, "formDiv");
        let labelaDodajDoktora = Help.newEl("label", dodajDoktoraForma, "heading");
        labelaDodajDoktora.innerHTML = "Dodaj doktora";

        Help.newEl("br", dodajDoktoraForma);

        //  3.1 Ime i prezime

        let labelaDodajDoktoraIme = Help.newEl("label", dodajDoktoraForma);
        labelaDodajDoktoraIme.innerHTML = "Ime: ";

        let inputDodajDoktoraIme = Help.newEl("input", dodajDoktoraForma);
        inputDodajDoktoraIme.type = "text";
        inputDodajDoktoraIme.placeholder = "Ime doktora";

        Help.newEl("br", dodajDoktoraForma);

        let labelaDodajDoktoraPrezime = Help.newEl("label", dodajDoktoraForma);
        labelaDodajDoktoraPrezime.innerHTML = "Prezime: "

        let inputDodajDoktoraPrezime = Help.newEl("input", dodajDoktoraForma);
        inputDodajDoktoraPrezime.type = "text";
        inputDodajDoktoraPrezime.placeholder = "Prezime doktora";

        let selectDodajDoktoraKapacitetLabela = Help.newEl("label", dodajDoktoraForma);
        selectDodajDoktoraKapacitetLabela.innerHTML = "Kapacitet: "
        let selectDodajDoktoraKapacitet = Help.newEl("select", dodajDoktoraForma);
        selectDodajDoktoraKapacitet.name = "kapacitetDoktora";
        var optionKapacitet = Help.newEl("option", selectDodajDoktoraKapacitet);
        optionKapacitet.value = "-1";

        for (let i = 0; i < 20; i++) {
            let optionKapacitetK = Help.newEl("option", selectDodajDoktoraKapacitet);
            optionKapacitetK.innerHTML = i;
            optionKapacitetK.value = i;
        }



        // 3.2 SUBMIT
        Help.newEl("br", dodajDoktoraForma);
        let submitDodajDoktora = Help.newEl("input", dodajDoktoraForma);
        submitDodajDoktora.type = "submit";

        // 3.3 PARSE
        submitDodajDoktora.onclick = (event) => {
            event.preventDefault();
            let dodajDoktoraSlanje = {
                ime: inputDodajDoktoraIme.value,
                prezime: inputDodajDoktoraPrezime.value,
                kapacitet: selectDodajDoktoraKapacitet.value
            }
            this.dodajDoktoraForm(dodajDoktoraSlanje);
        }

        // 4. IZVESTAJ

        let izvestajForma = Help.newEl("form", izmeneDiv, "formDiv");
        let labelaIzvestaj = Help.newEl("label", izvestajForma, "heading");
        labelaIzvestaj.innerHTML = "Izvestaj o pacijentu";


        Help.newEl("br", izvestajForma)

        // 4.1 Indeks
        //      X
        let labelaIzvestajX = Help.newEl("label", izvestajForma);
        labelaIzvestajX.innerHTML = "X";
        let selectIzvestajX = Help.newEl("select", izvestajForma);
        selectIzvestajX.name = "IzvestajX";
        let optionEmptyIzvestajX = Help.newEl("option", selectIzvestajX);
        optionEmptyIzvestajX.value = "-1";

        for (let i = 0; i < this.duzina; i++) {
            var optionIzvestajX = Help.newEl("option", selectIzvestajX);
            optionIzvestajX.innerHTML = i;
            optionIzvestajX.value = i;
        }


        //      Y
        var labelaIzvestajY = Help.newEl("label", izvestajForma);
        labelaIzvestajY.innerHTML = "Y";
        var selectIzvestajY = Help.newEl("select", izvestajForma);
        selectIzvestajY.name = "IzvestajY";
        var optionEmptyOptionY = Help.newEl("option", selectIzvestajY);
        optionEmptyOptionY.value = "-1";

        for (let i = 0; i < this.sirina; i++) {
            let optionIzvestajY = Help.newEl("option", selectIzvestajY);
            optionIzvestajY.innerHTML = i;
            optionIzvestajY.value = i;
        }

        Help.newEl("br", izvestajForma);

        //SUBMIT

        let submitIzvestaj = Help.newEl("input", izvestajForma);
        submitIzvestaj.type = "submit";

        //PARSE
        submitIzvestaj.onclick = (event) => {
            event.preventDefault();
            let x = selectIzvestajX.value;
            let y = selectIzvestajY.value;
            this.uzmiIzvestaj(x, y);
        }


        // 5. CRTANJE MATRICE
        if (this.sirina > 0 && this.duzina > 0 && glavniDiv != null) {
            this.crtajMatricu(glavniDiv);
        }

        // 6.dodatni dugmici
        let pomocniDiv = Help.newEl("div", glavniContainer);
        pomocniDiv.className = "pomocniDiv";
        let vidiDoktore = Help.newEl("button", pomocniDiv, "pomocniDivDugme");
        vidiDoktore.innerHTML = "Vidi doktore";
        vidiDoktore.onclick = (event) => {
            event.preventDefault();
            this.prikaziDoktore();
        }


    }

    crtajMatricu(glavniDiv) {
        if (glavniDiv == null) {
            alert("greska u fun")
        }
        var matricaDiv = Help.newEl("div", glavniDiv, "matricaDiv");
        var matricaTable = Help.newEl("table", matricaDiv);
        var matricaTHead = Help.newEl("thead", matricaTable);
        var matricaTR = Help.newEl("tr", matricaTHead);
        var matricaTH = Help.newEl("th", matricaTR);
        matricaTH.innerHTML = this.naziv;
        var matricaTBody = Help.newEl("tbody", matricaTable);
        var matTR = [];
        var matTD = [...Array(this.sirina)].map(x => Array(this.duzina).fill(null));
        for (let i = 0; i < this.duzina; i++) {
            matTR[i] = Help.newEl("tr", matricaTBody);
            for (let j = 0; j < this.sirina; j++) {
                matTD[i][j] = Help.newEl("td", matTR[i]);
                if (this.matrica[i][j] == null)
                    this.matrica[i][j] = new Krevet(i, j);
                this.matrica[i][j].crtajKrevet(matTD[i][j]);

            }
        }
    }

    ponovoNacrtaj() {
        this.izbrisiSve();
        this.crtajBolnicu(this.host);
    }

    crtajIzvestaj(podaci) {
        var modal = Help.modalScreen();
        var host = Help.newEl("form", modal);
        var imelabel = Help.newEl("label", host);
        imelabel.innerHTML = "IME: "
        var imeinput = Help.newEl("input", host);
        imeinput.value = podaci.ime;
        imeinput.type = "text";

        Help.newEl("br", host);

        var prezimelabel = Help.newEl("label", host);
        prezimelabel.innerHTML = "PREZIME: "
        var prezimeinput = Help.newEl("input", host);
        prezimeinput.value = podaci.prezime;

        Help.newEl("br", host);

        var godinalabel = Help.newEl("label", host);
        godinalabel.innerHTML = "GODINA RODJENJA: ";
        var godinainput = Help.newEl("input", host);
        godinainput.value = podaci.godinaRodjenja;
        godinainput.type = "text";

        Help.newEl("br", host);

        var dodatneInfolabel = Help.newEl("label", host);
        dodatneInfolabel.innerHTML = "Dodatne informacije: ";
        var dodatneInfoInput = Help.newEl("input", host);
        dodatneInfoInput.type = "text";
        dodatneInfoInput.value = podaci.dodatneInfo;

        Help.newEl("br", host);

        var doktorlabel = Help.newEl("label", host);
        doktorlabel.innerHTML = "DOKTOR: ";
        var doktorinput = Help.newEl("select", host);
        doktorinput.name = "doktorInput";
        for (let i = 0; i < this.doktori.length; i++) {
            var doktoroption = Help.newEl("option", doktorinput);
            doktoroption.value = i;
            doktoroption.innerHTML = this.doktori[i].ime + " " + this.doktori[i].prezime;
            if (this.doktori[i].id == podaci.doktorID) {
                doktorinput.selectedIndex = i;
            }
        }

        Help.newEl("br", host);

        var pozicijalabel = Help.newEl("label", host);
        pozicijalabel.innerHTML = "Pozicija ";
        var xlabel = Help.newEl("label", host);
        xlabel.innerHTML = "X: "
        var xselect = Help.newEl("select", host);
        xselect.name = "xSelect";
        for (let i = 0; i < this.duzina; i++) {
            var xoption = Help.newEl("option", xselect);
            xoption.value = i;
            xoption.innerHTML = i;
        }
        xselect.selectedIndex = podaci.krevetX;
        var ylabel = Help.newEl("label", host);
        ylabel.innerHTML = "Y: "
        var yselect = Help.newEl("select", host);
        yselect.name = "ySelect";
        for (let i = 0; i < this.sirina; i++) {
            var yoption = Help.newEl("option", yselect);
            yoption.value = i;
            yoption.innerHTML = i;
        }
        yselect.selectedIndex = podaci.krevetY;

        Help.newEl("br", host);

        var bolestlabel = Help.newEl("label", host);
        bolestlabel.innerHTML = "Bolest: ";
        let labelaBolesti1 = Help.newEl("label", host);
        labelaBolesti1.innerHTML = "Kovid";
        let radioBolesti1 = Help.newEl("input", host);
        radioBolesti1.type = "radio";
        radioBolesti1.name = "izvestajBolest";


        let labelaBolesti2 = Help.newEl("label", host);
        labelaBolesti2.innerHTML = "Prehlada";
        let radioBolesti2 = Help.newEl("input", host);
        radioBolesti2.type = "radio";
        radioBolesti2.name = "izvestajBolest";


        let labelaBolesti3 = Help.newEl("label", host);
        labelaBolesti3.innerHTML = "Alergija";
        let radioBolesti3 = Help.newEl("input", host);
        radioBolesti3.type = "radio";
        radioBolesti3.name = "izvestajBolest";
        if (podaci.bolest == "Kovid") {
            radioBolesti1.checked = true;
        } else if (podaci.bolest == "Prehlada") {
            radioBolesti2.checked = true;
        } else {
            radioBolesti3.checked = true;
        }

        Help.newEl("br", host);

        let labelasimptomi = Help.newEl("label", host);
        labelasimptomi.innerHTML = "Simptomi:";
        let labelasimptomiopis = Help.newEl("label", host);
        labelasimptomiopis.innerHTML = podaci.simptomi;

        let gotov = Help.newEl("input", host, "gotovoDugme");
        gotov.type = "submit";
        gotov.onclick = async (event) => {
            event.preventDefault();
            let ime = imeinput.value;
            let prezime = prezimeinput.value;
            let godinaRodjenja = godinainput.value;
            let dodatneInfo = dodatneInfoInput.value;
            let doktor = this.doktori[doktorinput.value];
            let x = xselect.value;
            let y = yselect.value;
            let bolest;
            let bolestID;

            if (radioBolesti1.checked) {
                bolest = "Kovid";
                bolestID = 1;
            } else if (radioBolesti2.checked) {
                bolest = "Prehlada";
                bolestID = 2;
            } else {
                bolest = "Alergija";
                bolestID = 3;
            }
            let pacijentZaPromenu = this.matrica[podaci.krevetX][podaci.krevetY];
            
            if (doktor.id != podaci.doktorID) {
                await pacijentZaPromenu.promeniDoktora(doktor).then(() => {
                    this.ucitajKrevetePonovo();
                })
            }

            if (ime != podaci.ime || 
                prezime != podaci.prezime || 
                godinaRodjenja != podaci.godinaRodjenja 
                || dodatneInfo != podaci.dodatneInfo) {
                pacijentZaPromenu.pacijent.promeniPodatke(ime, prezime, godinaRodjenja, dodatneInfo);
                this.ucitajKrevetePonovo();
            }

            if (x != podaci.krevetX || y != podaci.krevetY) {
                console.log(podaci.krevetX, podaci.krevetY)
                this.premestiPacijenta(podaci.krevetX, podaci.krevetY, x, y);
            }

            if (bolest != podaci.bolest) {
                this.promeniBolest(x, y);
            }

            Help.closeModalScreen();
        }
    }

    izbrisiSve() {
        var e = this.host;
        var child = e.lastElementChild; 
        while (child) {
            e.removeChild(child);
            child = e.lastElementChild;
        }
    }

    dodajDoktora(doktor) {
        this.doktori.push(doktor);
        this.ponovoNacrtaj();
    }
    dodajPacijenta(pacijent, x, y, bolest, doktor) {
        if (x >= this.sirina || y >= this.duzina) {
            alert("GRESKA: Parametri su van opsega matrice!");
            return 0;
        }

        if (!this.matrica[x][y].prazan) {
            alert("GRESKA: Krevet je zauzet!");
            return 0;
        }

        this.matrica[x][y].smestiPacijenta(pacijent, bolest, doktor);
        this.ponovoNacrtaj();
    }

    async dodajDoktoraForm(dodajDoktoraSlanje) {
        let ime = dodajDoktoraSlanje.ime;
        let prezime = dodajDoktoraSlanje.prezime;
        let kapacitet = dodajDoktoraSlanje.kapacitet;
        let url = new URL("https://localhost:5001/Doktor/DodajDoktora");
        url.search = new URLSearchParams({
            ime,
            prezime,
            kapacitet,
            bolnicaID: this.id
        });
        await fetch(url, {
            method: "POST"
        }).then(async (res) => {
            await res.json().then(async (res2) => {
                let doktor = new Doktor(res2, ime, prezime, kapacitet, 0);
                this.dodajDoktora(doktor);
            })
        }).catch(err => console.log(err))
    }

    async dodajPacijentaForm(event, formaSlanje) {
        event.preventDefault();
        let ime = formaSlanje.ime;
        let prezime = formaSlanje.prezime;
        let selektovano = formaSlanje.selektovano;
        let doktor = formaSlanje.doktor;
        let x = formaSlanje.x;
        let y = formaSlanje.y;

        if (ime.length < 3) {
            alert("Ime mora da sadrzi barem tri karaktera!");
            return 0;
        }
        if (prezime.length < 3) {
            alert("Prezime mora da sadrzi barem tri karaktera!");
            return 0;
        }
        if (!Help.validateString(ime)) {
            alert("Ime mora biti sacinjeno od malih i velikih slova!");
            return 0;
        }
        if (!Help.validateString(prezime)) {
            alert("Ime mora biti sacinjeno od malih i velikih slova!");
            return 0;
        }
        if (!selektovano) {
            alert("Molimo vas da odaberete oboljenje!");
            return 0;
        }
        if (doktor == null) {
            alert("Molimo vas da odaberete doktora!");
            return 0;
        }
        if (!doktor.slobodan()) {
            alert("Doktor nije slobodan da preuzme novog pacijenta! Molimo vas odaberite drugog doktora!");
            return 0;
        }
        if (x < 0 || y < 0) {
            alert("Molimo vas da odaberete sobu koju zelite!");
            return 0;
        }
        if (!this.matrica[x][y].prazan) {
            alert("Navedeni krevet je zauzet! Molimo vas odaberite drugi krevet!");
            return 0;
        }

        let url = new URL("https://localhost:5001/Pacijent/NapraviPacijenta");
        url.search = new URLSearchParams({
            ime,
            prezime,
            godinaRodjenja: 2000,
            dodatneInfo: ""
        });
        await fetch(url, {
            method: "POST"
        }).then(async (res) => {
            await res.json().then(async (res2) => {
                let pacijentID = res2.id;
                let url2 = new URL("https://localhost:5001/Krevet/DodajKrevet");
                url2.search = new URLSearchParams({
                    pacijentID: pacijentID,
                    bolnicaID: this.id,
                    doktorID: doktor.id,
                    bolestID: selektovano+1,
                    x: x,
                    y: y
                })
            
                await fetch(url2, {
                    method: "POST"
                }).then(() => {
                    doktor.brojUzetihPacijenata++;
                    this.ucitajKrevetePonovo();
                })
            }).catch(err => console.log(err));
        }).catch(err =>  console.log(err));
    }

    async uzmiIzvestaj(x, y) {
        let id = this.matrica[x][y].pacijent.id;
        let url = new URL("https://localhost:5001/Pacijent/Izvestaj");
        url.search = new URLSearchParams({
            pacijentID: id
        });
        await fetch(url, {
            method: "GET"
        }).then(async (res) => {
            await res.json().then(async (res2) => {
                let podaci = res2;
                this.crtajIzvestaj(podaci);
            })
        }).catch(err => console.log(err));
    }

    prikaziDoktore() {
        var host = Help.modalScreen();
        var glavniDivDoktori = Help.newEl("div", host, "glavniDivDoktori");
        var tabelaDoktori = Help.newEl("table", glavniDivDoktori, "tableDoktori");
        var theadDoktori = Help.newEl("thead", tabelaDoktori);
        var trDoktori1 = Help.newEl("tr", theadDoktori);
        var thDoktori1 = Help.newEl("th", trDoktori1);
        thDoktori1.innerHTML = "Ime";
        var thDoktori2 = Help.newEl("th", trDoktori1);
        thDoktori2.innerHTML = "Prezime";
        var thDoktori3 = Help.newEl("th", trDoktori1);
        thDoktori3.innerHTML = "Kapacitet";
        var thDoktori4 = Help.newEl("th", trDoktori1);
        thDoktori4.innerHTML = "Br uzetih pacijenata";
        var thDoktori5 = Help.newEl("th", trDoktori1);
        thDoktori5.innerHTML = "Otpusti doktora";
        for (let i = 0; i < this.doktori.length; i++) {
            var trDoktoriI = Help.newEl("tr", tabelaDoktori);
            var tdDoktori1 = Help.newEl("td", trDoktoriI);
            tdDoktori1.innerHTML = this.doktori[i].ime
            var tdDoktori2 = Help.newEl("td", trDoktoriI);
            tdDoktori2.innerHTML = this.doktori[i].prezime
            var tdDoktori3 = Help.newEl("td", trDoktoriI);
            tdDoktori3.innerHTML = this.doktori[i].kapacitet
            var tdDoktori4 = Help.newEl("td", trDoktoriI);
            tdDoktori4.innerHTML = this.doktori[i].brojUzetihPacijenata;
            var tdDoktori5 = Help.newEl("td", trDoktoriI, "izbrisiDoktora");
            var spanDoktoriX = Help.newEl("span", tdDoktori5, "izbrisiDoktoraX");
            spanDoktoriX.innerHTML = "X";
            spanDoktoriX.onclick = async (event) => {
                event.preventDefault();
                let provera = await this.doktori[i].izbrisiDoktora();
                if (provera == false) {
                    alert("Doktor jos uvek ima pacijente!");
                } else {
                    this.izbrisiDoktora(i);
                    Help.closeModalScreen();
                }
            }
        }
    }

    izbrisiDoktora(i) {
        this.doktori = this.doktori.filter(p => p.id != this.doktori[i].id);
        this.ponovoNacrtaj();
        this.prikaziDoktore();
    }

    async premestiPacijenta(staroX, staroY, novoX, novoY) {
        if (this.matrica[novoX][novoY]) {
            if (!this.matrica[novoX][novoY].prazan) {
                alert("Ima pacijenta na tom mestu!");
            }
        }
        await fetch("https://localhost:5001/Krevet/PomeriPacijenta/" + this.matrica[staroX][staroY].pacijent.id + "/" + novoX + "/" + novoY, {
            method: "POST"
        }).then(async () => {
            this.ucitajKrevetePonovo();
        })
        .catch(err => console.log(err));
    }

    async otpustiPacijentaForm(formaOtpusti) {
        let x = formaOtpusti.x;
        let y = formaOtpusti.y;
        if (!this.matrica[x][y]) {
            alert("Nema pacijenta na tom mestu!");
            return 0;
        }
        await fetch("https://localhost:5001/Pacijent/IzbrisiPacijenta/" + this.matrica[x][y].pacijent.id, {
            method: "DELETE"
        }).then(async () => {
            let doktorID = this.matrica[x][y].doktor.id;
            this.doktori.find(p => p.id == doktorID).brojUzetihPacijenata--;
            this.matrica[x][y] = null;
            this.ucitajKrevetePonovo();
        }).catch(err => {
            alert(err);
        })

    }

    async ucitajKrevetePonovo() {
        this.matrica = [...Array(this.sirina)].map(x => Array(this.duzina).fill(null));
        await fetch("https://localhost:5001/Bolnica/PreuzmiBolnice?bolnicaID=" + this.id).then(async (res) => {
            await res.json().then(async (res2) => {
                res2.forEach((item) => {
                    let kreveti = item.kreveti;
                    kreveti.forEach((item2) => {
                        let pacijent = new Pacijent(item2.ime, item2.prezime, item2.pacijentID);
                        let bolest = new Bolest(item2.bolest);
                        let doktor = new Doktor(item2.doktorID, item2.doktorIme, item2.doktorPrezime);
                        let krevet = new Krevet(item2.x, item2.y, this, pacijent, bolest, doktor, item2.krevetID);
                        this.matrica[krevet.x][krevet.y] = krevet;
                    })
                    this.ponovoNacrtaj();
                })
            })
        }).catch(err => console.log(err))
    }
}