using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BolnicaController : ControllerBase
    {
        private BolnicaContext Context;

        public BolnicaController(BolnicaContext context) {
            Context = context;
        }

        [EnableCors("CORS")]
        [Route("PreuzmiBolnice")]
        [HttpGet]
        public async Task<ActionResult> preuzmi(int? bolnicaID) {
            try {
                var bolnice = Context.bolnice
                    .Include(p => p.doktori)
                    .Include(p => p.bolnicaSpoj)
                    .ThenInclude(p => p.pacijent)
                    .Include(p => p.bolnicaSpoj)
                    .ThenInclude(p => p.doktor)
                    .Include(p => p.bolnicaSpoj)
                    .ThenInclude(p => p.bolest);
                var bolniceParse = bolnice.Select(p => new {
                    ID = p.ID,
                    naziv = p.naziv,
                    duzina = p.duzina,
                    sirina = p.sirina,
                    kreveti = p.bolnicaSpoj.Select(s => new {
                        krevetID = s.ID,
                        doktorID = s.doktor.ID,
                        doktorIme = s.doktor.ime,
                        doktorPrezime = s.doktor.prezime,
                        bolest = s.bolest.nazivBolesti,
                        bolestID = s.bolest.ID,
                        simptomi = s.bolest.simptomi,
                        x = s.x,
                        y = s.y,
                        pacijentID = s.pacijent.ID,
                        ime = s.pacijent.Ime,
                        prezime = s.pacijent.Prezime,
                    }),
                    doktori = p.doktori.Select(s => new {
                        doktorID = s.ID,
                        ime = s.ime,
                        prezime = s.prezime,
                        kapacitet = s.kapacitet,
                        brUzetihPacijenata = s.brUzetihPacijenata
                    })
                });
                if (bolnicaID != null) {
                    bolniceParse = bolniceParse.Where(p => p.ID == bolnicaID);
                }
                return Ok(await bolniceParse.ToListAsync());
            }
            catch (Exception e) {
                return BadRequest(e);
            }
        }
        
        [EnableCors("CORS")]
        [Route("Napravi")]
        [HttpPost]
        public async Task<ActionResult> napraviBolnicu(String naziv, int duzina, int sirina) {
            if (naziv.Length < 5) {
                return BadRequest("Naziv mora imati 5 karaktera!");
            }
            if (duzina < 0) {
                return BadRequest("Duzina ne sme biti negativan broj!");
            }
            if (sirina < 0) {
                return BadRequest("Sirina ne sme biti negativan broj!");
            }
            if (await Context.bolnice.AnyAsync(b => b.naziv == naziv)) {
                return BadRequest("Vec postoji bolnica sa zadatim imenom!");
            }
            try {
                Bolnica bolnica = new Bolnica();
                bolnica.naziv = naziv;
                bolnica.duzina = duzina;
                bolnica.sirina = sirina;
                await Context.bolnice.AddAsync(bolnica);
                await Context.SaveChangesAsync();
                return Ok(bolnica);
            }
            catch(Exception e) {
                return BadRequest(e);
            }
        }
        [EnableCors("CORS")]
        [Route("preuzmiOsnovneBolesti")]
        [HttpGet]
        public ActionResult preuzmiOsnovneBolesti() {
            try {
                var bolesti = Context.bolesti.Take(3);
                return Ok(bolesti);
            }
            catch(Exception e) {
                return BadRequest(e);
            }
        }

    }
}