using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using projectManager.Models;
using projectManager.Data;

namespace projectManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AssetsController : ControllerBase
    {
        private readonly projectDataContext _context;

        public AssetsController(projectDataContext context)
        {
            _context = context;
        }

        // GET: api/Assets
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Assets>>> GetAssets()
        {
            return await _context.Assets.ToListAsync();
        }

        // GET: api/Assets/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Assets>> GetAssets(int id)
        {
            var assets = await _context.Assets.FindAsync(id);

            if (assets == null)
            {
                return NotFound();
            }

            return assets;
        }

        [HttpGet("find/{id}")]
        public async Task<ActionResult<Assets>> FindAssets(int id)
        {
            var movies = from m in _context.Assets
                         select m;

            //if (!String.IsNullOrEmpty(searchString))
            //{
            movies = movies.Where(s => s.ProjectId.Equals(id));
            //movies = movies.Where(s => s.Id.Equals(id));
            //}

            if (movies == null)
            {
                return NotFound();
            }

            return Ok(movies);
        }

        // PUT: api/Assets/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAssets(int id, Assets assets)
        {
            if (id != assets.Id)
            {
                return BadRequest();
            }

            _context.Entry(assets).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AssetsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Assets
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Assets>> PostAssets(Assets assets)
        {
           _context.Assets.Add(assets);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAssets", new { id = assets.Id }, assets);
        }

        // DELETE: api/Assets/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Assets>> DeleteAssets(int id)
        {
            var assets = await _context.Assets.FindAsync(id);
            if (assets == null)
            {
                return NotFound();
            }

            _context.Assets.Remove(assets);
            await _context.SaveChangesAsync();

            return assets;
        }

        private bool AssetsExists(int id)
        {
            return _context.Assets.Any(e => e.Id == id);
        }
    }
}
