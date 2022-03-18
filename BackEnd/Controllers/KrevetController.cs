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
    public class KrevetController : ControllerBase
    {
        private BolnicaContext Context;

        public KrevetController(BolnicaContext context) {
            Context = context;
        }
        
        
        [EnableCors("CORS")]
        [Route("DodajKrevet")]
        [HttpPost]
        public async Task<ActionResult> dodajKrevet(int pacijentID, int bolestID, int doktorID, int bolnicaID, int x, int y) {
            try {
                if (!(await Context.pacijenti.AnyAsync(p => p.ID == pacijentID))) {
                    return BadRequest("Ne postoji pacijent sa zadatim ID.");
                }
                if (!(await Context.bolesti.AnyAsync(p => p.ID == bolestID))) {
                    return BadRequest("Ne postoji bolest sa zadatim ID.");
                }
                if (!(await Context.doktori.AnyAsync(p => p.ID == doktorID))) {
                    return BadRequest("Ne postoji doktor sa zadatim ID.");
                }
                if (!(await Context.bolnice.AnyAsync(p => p.ID == bolnicaID))) {
                    return BadRequest("Ne postoji bolnica sa zadatim ID.");
                }
                var bolnicaZaProveru = await Context.bolnice.Where(p => p.ID == bolnicaID)
                    .Include(p => p.bolnicaSpoj).FirstOrDefaultAsync();
                int sirina = bolnicaZaProveru.sirina;
                int duzina = bolnicaZaProveru.duzina;
                if (x > duzina || x < 0) {
                    return BadRequest("X nije u opsegu!");
                }
                if (y > sirina || y < 0) {
                    return BadRequest("Y nije u opsegu!");
                }
                if (bolnicaZaProveru.bolnicaSpoj.Any(p => p.x == x && p.y == y)) {
                    return BadRequest("Krevet je zauzet!");
                }
                var doktor = await Context.doktori.Where(p => p.ID == doktorID).FirstOrDefaultAsync();
                if (doktor.brUzetihPacijenata == doktor.kapacitet) {
                    return BadRequest("Doktor nema kapaciteta!");
                }
                Krevet krevet = new Krevet();
                var bolest = await Context.bolesti.Where(p => p.ID == bolestID).FirstOrDefaultAsync();
                var pacijent = await Context.pacijenti.Where(p => p.ID == pacijentID).FirstOrDefaultAsync();
                krevet.bolest = bolest;
                krevet.bolnica = bolnicaZaProveru;
                krevet.doktor = doktor;
                krevet.pacijent = pacijent;
                krevet.x = x;
                krevet.y = y;
                doktor.brUzetihPacijenata++;
                Context.doktori.Update(doktor);
                await Context.kreveti.AddAsync(krevet);
                await Context.SaveChangesAsync();
                return Ok(krevet);
            }
            catch (Exception e) {
                return BadRequest(e);
            }
        }
        
        [EnableCors("CORS")]
        [Route("PomeriPacijenta/{pacijentID}/{x}/{y}")]
        [HttpPut]
        public async Task<ActionResult> pomeriPacijenta(int pacijentID, int x, int y) {
            try {
                if (!(await Context.pacijenti.Where(p => p.ID == pacijentID).AnyAsync())) {
                    return BadRequest("Nepostojeci pacijent");
                } 
                var krevet = await Context.kreveti
                    .Include(p => p.pacijent)
                    .Include(p => p.bolnica)
                    .Where(p => pacijentID == p.krevetID)
                    .FirstOrDefaultAsync();
                if (await Context.kreveti.AnyAsync(p => (p.bolnica.ID == krevet.bolnica.ID && p.x == x && p.y == y))) {
                    return BadRequest("Mesto je zauzeto u zadatoj bolnici!");
                }
                krevet.x = x;
                krevet.y = y;
                Context.kreveti.Update(krevet);
                await Context.SaveChangesAsync();
                return Ok("Uspeh");
            }
            catch (Exception e) {
                return BadRequest(e);
            }
        }

        [EnableCors("CORS")]
        [Route("PromeniDoktora/{krevetID}")]
        [HttpPut]
        public async Task<ActionResult> promeniDoktora(int krevetID, [FromQuery]int doktorID) {
            try {
                if (!(await Context.kreveti.Where(p => p.ID == krevetID).AnyAsync())) {
                    return BadRequest("Pogresan ID kreveta!");
                }
                if (!(await Context.doktori.Where(p => p.ID == doktorID).AnyAsync())) {
                    return BadRequest("Pogresan ID doktora!");
                }
                var doktorNovi = await Context.doktori.Where(p => p.ID == doktorID).FirstOrDefaultAsync();
                if (doktorNovi.brUzetihPacijenata == doktorNovi.kapacitet) {
                    return BadRequest("Doktor nema kapaciteta!");
                }
                var krevet = await Context.kreveti.Where(p => p.ID == krevetID)
                    .Include(p => p.doktor)
                    .FirstOrDefaultAsync();
                var doktorStari = await Context.doktori.Where(p => p.ID == krevet.doktor.ID).FirstOrDefaultAsync();
                doktorNovi.brUzetihPacijenata++;
                doktorStari.brUzetihPacijenata--;
                krevet.doktor = doktorNovi;
                Context.doktori.Update(doktorNovi);
                Context.doktori.Update(doktorStari);
                Context.kreveti.Update(krevet);
                await Context.SaveChangesAsync();
                return Ok("Uspeh");
            }
            catch(Exception e) {
                return BadRequest(e);
            }
        }
    }
}