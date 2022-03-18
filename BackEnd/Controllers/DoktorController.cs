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
    public class DoktorController : ControllerBase
    {
        private BolnicaContext Context;

        public DoktorController(BolnicaContext context) {
            Context = context;
        }
        [Route("DodajDoktora")]
        [HttpPost]
        public async Task<ActionResult> dodajDoktora(String ime, String prezime, int bolnicaID, int kapacitet) {
            try {
                if (String.IsNullOrWhiteSpace(ime) || ime.Length < 3 || ime.Length > 50) {
                    return BadRequest("Ime nije ispravno uneseno!");
                }
                if (String.IsNullOrWhiteSpace(prezime) || prezime.Length < 3 || prezime.Length > 50) {
                    return BadRequest("Prezime nije ispravno uneseno!");
                }
                if (!(await Context.bolnice.AnyAsync(b => b.ID == bolnicaID))) {
                    return BadRequest("Ne postoji zadata bolnica!");
                }
                if (kapacitet < 1 || kapacitet > 20) {
                    return BadRequest("Kapacitet mora biti izmedju 1 i 20!");
                }
                Doktor doktor = new Doktor();
                doktor.ime = ime;
                doktor.prezime = prezime;
                var bolnica = await Context.bolnice.FirstOrDefaultAsync(b => b.ID == bolnicaID);
                doktor.bolnica = bolnica;
                doktor.kapacitet = kapacitet;
                doktor.brUzetihPacijenata = 0;
                await Context.doktori.AddAsync(doktor);
                await Context.SaveChangesAsync();
                return Ok(doktor.ID);
            }
            catch (Exception e) {
                return BadRequest(e);
            }
        }

        [Route("IzbrisiDoktora/{doktorID}")]
        [HttpDelete]
        public async Task<ActionResult> izbrisiDoktora(int doktorID) {
            try {
                if (!(await Context.doktori.AnyAsync(p => p.ID == doktorID))) {
                    return BadRequest("Doktor sa unesenim ID-em ne postoji!");
                }
                var doktorZaBrisanje = await Context.doktori.Where(p => p.ID == doktorID)
                    .FirstOrDefaultAsync();
                if (doktorZaBrisanje.brUzetihPacijenata != 0) {
                    return BadRequest("Doktor ne moze da se obrise jer ima pacijente!");
                }
                Context.doktori.Remove(doktorZaBrisanje);
                await Context.SaveChangesAsync();
                return Ok("Uspeh!");
            }
            catch(Exception e) {
                return BadRequest(e);
            }
        }
    }
}