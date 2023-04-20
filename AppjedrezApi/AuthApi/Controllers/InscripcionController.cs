using AuthApi.Context;
using AuthApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AuthApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class InscripcionController : ControllerBase
{
    private readonly AppDbContext _context;
    public InscripcionController(AppDbContext dbContext)
    {
        _context = dbContext;
    }

    [HttpPost("registrar")]
    public async Task<IActionResult> RegisterInscripcion([FromBody] Inscripcion inscripcionObj)
    {
        if (inscripcionObj == null)
            return BadRequest();

        inscripcionObj.Id = Guid.NewGuid();
        await _context.Inscripcions.AddAsync(inscripcionObj);
        await _context.SaveChangesAsync();
        return Ok(new
        {
            Message = "Inscripcion Register Success"
        });
    }

    [HttpGet("get")]
    public async Task<ActionResult<IEnumerable<Inscripcion>>> GetAllParticipantes()
    {
        var inscripcion = await _context.Inscripcions
            .Include(t => t.IdParticipanteNavigation).Select(t => new
            {
                Id = t.Id,
                IdTorneo = t.IdTorneo,
                IdParticipante = t.IdParticipante,
                HoraInscripcion = t.HoraInscripcion,
                Participante = new
                {
                    Nombres = t.IdParticipanteNavigation.Nombres,
                    Apellido = t.IdParticipanteNavigation.Apellido
                }
            })
            .ToListAsync();

        return Ok(inscripcion);
    }

    [HttpDelete("delete/{id}")]
    public async Task<ActionResult> DeleteInscripcion(Guid id)
    {
        var inscripcion = await _context.Inscripcions.FindAsync(id);
        if (inscripcion == null)
        {
            return NotFound();
        }

        _context.Inscripcions.Remove(inscripcion);
        var result = await _context.SaveChangesAsync();
        return Ok(result);
    }
}
