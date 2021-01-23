using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using projectManager.Data;
using projectManager.Models;

namespace projectManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AspNetUsersController : Microsoft.AspNetCore.Mvc.Controller
    {
        private readonly projectDataContext _context;
        private UserManager<ApplicationUser> _userManager;

        public AspNetUsersController(projectDataContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }


        public string Username { get; set; }

        [TempData]
        public string StatusMessage { get; set; }

        [BindProperty]
        public InputModel Input { get; set; }

        public class InputModel
        {

            [PersonalData]
            public string Company { get; set; }
            [PersonalData]
            public string Address1 { get; set; }
            [PersonalData]
            public string Address2 { get; set; }
            [PersonalData]
            public string City { get; set; }
            [PersonalData]
            public string State { get; set; }
            [PersonalData]
            public int Zip { get; set; }
            [PersonalData]
            public string Avatar { get; set; }

        }

        public async Task<IActionResult> OnGetAsync()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return NotFound($"Unable to load user with ID '{_userManager.GetUserId(User)}'.");
            }

            await LoadAsync(user);

            return Ok(Username);
        }

        private async Task LoadAsync(ApplicationUser user)
        {
            var userName = await _userManager.GetUserNameAsync(user);

            Username = userName;

            Input = new InputModel
            {
                Company = user.Company,
                Address1 = user.Address1,
                Address2 = user.Address2,
                City = user.City,
                State = user.State,
                Zip = user.Zip,
                Avatar = user.Avatar
            };
        }

        // GET: api/AspNetUsers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AspNetUsers>>> GetAspNetUsers()
        {
            return await _context.AspNetUsers.ToListAsync();
        }

        // GET: api/AspNetUsers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AspNetUsers>> GetAspNetUsers(string id)
        {
            var aspNetUsers = await _context.AspNetUsers.FindAsync(id);

            if (aspNetUsers == null)
            {
                return NotFound();
            }

            return aspNetUsers;
        }

        // PUT: api/AspNetUsers/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAspNetUsers(string id, AspNetUsers aspNetUsers)
        {
            if (id != aspNetUsers.Id)
            {
                return BadRequest();
            }

            _context.Entry(aspNetUsers).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AspNetUsersExists(id))
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

        // POST: api/AspNetUsers
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<AspNetUsers>> PostAspNetUsers(AspNetUsers aspNetUsers)
        {
            _context.AspNetUsers.Add(aspNetUsers);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (AspNetUsersExists(aspNetUsers.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetAspNetUsers", new { id = aspNetUsers.Id }, aspNetUsers);
        }

        // DELETE: api/AspNetUsers/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<AspNetUsers>> DeleteAspNetUsers(string id)
        {
            var aspNetUsers = await _context.AspNetUsers.FindAsync(id);
            if (aspNetUsers == null)
            {
                return NotFound();
            }

            _context.AspNetUsers.Remove(aspNetUsers);
            await _context.SaveChangesAsync();

            return aspNetUsers;
        }

        private bool AspNetUsersExists(string id)
        {
            return _context.AspNetUsers.Any(e => e.Id == id);
        }
    }
}
