import { Bolnica } from "./Bolnica.js";
import { Krevet } from './Krevet.js';
import { Doktor } from './Doktor.js';
import { Bolest } from './Bolest.js';
import { Pacijent } from './Pacijent.js';


async function crtaj() {
     var mainContainer = document.createElement("div");
     mainContainer.className = "mainContainerBolnica";
     document.body.appendChild(mainContainer);

     await fetch("https://localhost:5001/Bolnica/PreuzmiBolnice", {
          method: "GET"
     }).then(async (res) => {
          await res.json().then(async (res2) => {
               res2.forEach((item) => {
                    let bolnicaParse = new Bolnica(item.naziv, item.duzina, item.sirina, item.id);
                    bolnicaParse.crtajBolnicu(mainContainer);
                    
                    let doktori = item.doktori;
                    doktori.forEach(item2 => {
                         let doktor = new Doktor(item2.doktorID, item2.ime, item2.prezime, item2.kapacitet, item2.brUzetihPacijenata);
                         bolnicaParse.dodajDoktora(doktor);
                    })

                    let kreveti = item.kreveti;
                    kreveti.forEach((item2, index2) => {
                         let pacijent = new Pacijent(item2.ime, item2.prezime, item2.pacijentID);
                         let bolest = new Bolest(item2.bolest);
                         let doktor = new Doktor(item2.doktorID, item2.doktorIme, item2.doktorPrezime);
                         let krevet = new Krevet(item2.x, item2.y, bolnicaParse, pacijent, bolest, doktor, item2.krevetID);
                         bolnicaParse.matrica[krevet.x][krevet.y] = krevet;

                    })

                    bolnicaParse.ponovoNacrtaj();

               })
          })
     }).catch(err => alert(err));
}

crtaj();