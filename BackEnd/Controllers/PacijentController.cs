using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PacijentController : ControllerBase
    {
        private BolnicaContext Context;

        public PacijentController(BolnicaContext context) {
            Context = context;
        }

        [Route("NapraviPacijenta")]
        [HttpPost]
        public async Task<ActionResult> napraviPacijenta(String ime, String prezime, int godinaRodjenja, String dodatneInfo) {
            if (String.IsNullOrWhiteSpace(ime) || ime.Length > 50 || ime.Length < 3) {
                return BadRequest("Ime nije ispravno uneseno!");
            }
            if (String.IsNullOrWhiteSpace(prezime) || prezime.Length < 3 || prezime.Length > 50) {
                return BadRequest("Prezime nije ispravno uneseno!");
            }
            if (godinaRodjenja  < 1900 || godinaRodjenja > 2023) {
                return BadRequest("Godina rodjenja nije pravilno unesena!");
            }
            try {
                Pacijent pacijent = new Pacijent();
                pacijent.Ime = ime;
                pacijent.Prezime = prezime;
                pacijent.godinaRodjenja = godinaRodjenja;
                if (String.IsNullOrWhiteSpace(dodatneInfo)) {
                    dodatneInfo = "Nema dodatnih informacija";
                } else {
                    pacijent.dodatneInfo = dodatneInfo;
                }
                
                await Context.pacijenti.AddAsync(pacijent);
                await Context.SaveChangesAsync();
                return Ok(pacijent);
            }
            catch (Exception e) {
                return BadRequest(e);
            }
        }

        [Route("PromeniPacijenta/{pacijentID}")]
        [HttpPost]
        public async Task<ActionResult> promeniPacijenta(int pacijentID, String Ime, String Prezime, int godinaRodjenja, String dodatneInfo) {
            try {
                if (!(await Context.pacijenti.Where(p => p.ID == pacijentID).AnyAsync())) {
                    return BadRequest("Pogresan ID pacijenta!");
                }
                if (String.IsNullOrWhiteSpace(Ime) || Ime.Length > 50 || Ime.Length < 3) {
                    return BadRequest("Ime nije ispravno uneseno!");
                }
                if (String.IsNullOrWhiteSpace(Prezime) || Prezime.Length < 3 || Prezime.Length > 50) {
                    return BadRequest("Prezime nije ispravno uneseno!");
                }
                if (godinaRodjenja  < 1900 || godinaRodjenja > 2023) {
                    return BadRequest("Godina rodjenja nije pravilno unesena!");
                }
                var pacijentZaPromenu = await Context.pacijenti.Where(p => p.ID == pacijentID).FirstOrDefaultAsync();
                if (!(pacijentZaPromenu.Ime.ToString() == Ime.ToString())) {
                    pacijentZaPromenu.Ime = Ime;
                }
                if (!(pacijentZaPromenu.Prezime.ToString() == Prezime.ToString())) {
                    pacijentZaPromenu.Prezime = Prezime;
                }
                if (!(pacijentZaPromenu.godinaRodjenja == godinaRodjenja)) {
                    pacijentZaPromenu.godinaRodjenja = godinaRodjenja;
                }
                if (String.IsNullOrWhiteSpace(dodatneInfo)) {
                    pacijentZaPromenu.dodatneInfo = "Nema dodatnih informacija!";
                } else {
                    pacijentZaPromenu.dodatneInfo = dodatneInfo;
                }
                Context.pacijenti.Update(pacijentZaPromenu);
                await Context.SaveChangesAsync();
                return Ok(pacijentZaPromenu);
            }
            catch (Exception e) {
                return BadRequest(e);
            }
        }
        [Route("IzbrisiPacijenta/{pacijentID}")]
        [HttpDelete]
        public async Task<ActionResult> izbrisiPacijenta(int pacijentID) {
            try {
                if (!(await Context.pacijenti.Where(p => p.ID == pacijentID).AnyAsync())) {
                    return BadRequest("Pogresan ID pacijenta!");
                }
                var pacijent = await Context.pacijenti.Where(p => p.ID == pacijentID)
                    .Include(p => p.pacijentSpoj)
                    .ThenInclude(p => p.doktor)
                    .FirstOrDefaultAsync();
                var doktor = await Context.doktori.Where(p => p.ID == pacijent.pacijentSpoj.doktor.ID).FirstOrDefaultAsync();
                doktor.brUzetihPacijenata--;
                Context.doktori.Update(doktor);
                Context.pacijenti.Remove(pacijent);
                await Context.SaveChangesAsync();
                return Ok("Pacijent izbrisan!");
            }
            catch(Exception e) {
                return BadRequest(e);
            }
        }
        [Route("Izvestaj")]
        [HttpGet]
        public async Task<ActionResult> izvestaj([FromQuery]int pacijentID) {
            try {
                var pacijent = await Context.pacijenti.Where(p => p.ID == pacijentID)
                .Include(p => p.pacijentSpoj)
                .ThenInclude(p => p.bolest)
                .Include(p => p.pacijentSpoj)
                .ThenInclude(p => p.bolnica)
                .Include(p=>p.pacijentSpoj)
                .ThenInclude(p=>p.doktor)
                .FirstOrDefaultAsync();
                if (pacijent == null) {
                    return BadRequest("Pogresan ID pacijenta!");
                }
                return Ok(new {
                    ime = pacijent.Ime,
                    prezime = pacijent.Prezime,
                    godinaRodjenja = pacijent.godinaRodjenja,
                    dodatneInfo = pacijent.dodatneInfo,
                    bolest = pacijent.pacijentSpoj.bolest.nazivBolesti,
                    simptomi = pacijent.pacijentSpoj.bolest.simptomi,
                    doktor = pacijent.pacijentSpoj.doktor.ime + " " + pacijent.pacijentSpoj.doktor.prezime,
                    doktorID = pacijent.pacijentSpoj.doktor.ID,
                    krevetX = pacijent.pacijentSpoj.x,
                    krevetY = pacijent.pacijentSpoj.y,
                    bolnica = pacijent.pacijentSpoj.bolnica.naziv 
                });
            }
            catch (Exception e) {
                return BadRequest(e);
            }
        }
    }
}