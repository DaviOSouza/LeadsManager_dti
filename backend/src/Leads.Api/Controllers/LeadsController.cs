using Leads.Api.Data;
using Leads.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Leads.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LeadsController : ControllerBase
    {
        private readonly LeadsDbContext _context;

        public LeadsController(LeadsDbContext context)
        {
            _context = context;
        }

        // GETALL: api/Leads
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Lead>>> GetAll()
        {
            try
            {
                var leads = await _context.Leads.ToListAsync();
                return Ok(leads);
                //return Ok(new { message = "Leads obtidas com sucesso.", data = leads });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro ao buscar leads.", detail = ex.Message });
            }
        }

        // GET: api/Leads/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Lead>> GetLeadById(int id)
        {
            var lead = await _context.Leads.FindAsync(id);

            if (lead == null)
                return NotFound(new { message = $"Lead com Id {id} não encontrada." });

            return Ok(new { message = "Lead obtida com sucesso.", data = lead });
        }

        // POST: api/Leads
        [HttpPost]
        public async Task<ActionResult<Lead>> CreateLead([FromBody] Lead lead)
        {
            try
            {
                if (lead == null)
                    return BadRequest(new { message = "Lead inválido." });

                lead.Status = "Invited";
                lead.DateCreated = DateTime.UtcNow;

                await _context.Leads.AddAsync(lead);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetLeadById), new { id = lead.Id },
                new { message = "Lead criada com sucesso.", data = lead });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro ao criar lead.", detail = ex.Message });
            }
        }

        // PUT: api/Leads/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateLead(int id, [FromBody] Lead updatedLead)
        {
            if (updatedLead == null)
                return BadRequest(new { message = "Lead inválida." });

            var lead = await _context.Leads.FindAsync(id);
            if (lead == null)
                return NotFound(new { message = $"Lead com Id {id} não encontrada." });

            lead.Suburb = updatedLead.Suburb;
            lead.Category = updatedLead.Category;
            lead.Description = updatedLead.Description;
            lead.Price = updatedLead.Price;
            lead.FirstName = updatedLead.FirstName;
            lead.FullName = updatedLead.FullName;
            lead.PhoneNumber = updatedLead.PhoneNumber;
            lead.Email = updatedLead.Email;

            if (!string.IsNullOrWhiteSpace(updatedLead.Status) &&
                (updatedLead.Status == "Accepted" || updatedLead.Status == "Declined"))
            {
                lead.Status = updatedLead.Status;

                if (lead.Status == "Accepted" && lead.Price > 500m)
                {
                    lead.Price *= 0.9m;
                }
            }

            try
            {
                await _context.SaveChangesAsync();
                return Ok(new { message = "Lead atualizada com sucesso.", data = lead });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro ao atualizar lead.", detail = ex.Message });
            }
        }

        // DELETE: api/Leads/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLead(int id)
        {
            var lead = await _context.Leads.FindAsync(id);

            if (lead == null)
                return NotFound(new { message = $"Lead com Id {id} não encontrada." });

            try
            {
                _context.Leads.Remove(lead);
                await _context.SaveChangesAsync();
                return Ok(new { message = $"Lead com Id {id} deletada com sucesso." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro ao deletar lead.", detail = ex.Message });
            }
        }

        //GET /api/Leads?status=??
        [HttpGet("filter")]
        public async Task<IActionResult> GetLeadsByStatus([FromQuery] string? status)
        {
            try
            {
                var query = _context.Leads.AsQueryable();

                if (!string.IsNullOrWhiteSpace(status))
                    query = query.Where(l => l.Status == status);

                var leads = await query.ToListAsync();

                return Ok(new { message = "Leads obtidas com sucesso.", data = leads });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro ao buscar leads.", detail = ex.Message });
            }
        }


    }
}
