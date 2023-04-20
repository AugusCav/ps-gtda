using AuthApi.Context;
using AuthApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AuthApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TorneoController : ControllerBase
{
    private readonly AppDbContext _context;
    public TorneoController(AppDbContext dbContext)
    {
        _context = dbContext;
    }

    [HttpPost("registrar")]
    public async Task<IActionResult> RegisterTorneo([FromBody] Torneo torneoObj)
    {
        if (torneoObj == null)
            return BadRequest();

        torneoObj.Id = Guid.NewGuid();
        await _context.Torneos.AddAsync(torneoObj);
        await _context.SaveChangesAsync();
        return Ok(new
        {
            Message = "Torneo Register Success"
        });
    }

    [HttpPut("actualizar")]
    public async Task<IActionResult> ActualizarTorneo([FromBody] Torneo torneoObj)
    {
        if (torneoObj == null)
            return BadRequest();

        var torneo = await _context.Torneos.FindAsync(torneoObj.Id);

        if (torneo == null)
            return BadRequest();

        torneo.Nombre = torneoObj.Nombre;
        torneo.Descripcion = torneoObj.Descripcion;
        torneo.FechaFinal = torneoObj.FechaFinal;
        torneo.FechaInicio = torneoObj.FechaInicio;
        torneo.HoraFinal = torneoObj.HoraFinal;
        torneo.HoraInicio = torneoObj.HoraInicio;
        torneo.Localidad = torneoObj.Localidad;
        torneo.IdTipoTorneo = torneoObj.IdTipoTorneo;
        torneo.EloMaximo = torneoObj.EloMaximo;
        torneo.EloMinimo = torneoObj.EloMinimo;
        torneo.CantidadParticipantes = torneoObj.CantidadParticipantes;

        _context.SaveChanges();
        return Ok(new
        {
            Message = "Torneo Update Success"
        });
    }

    [HttpDelete("eliminar")]
    public async Task<IActionResult> EliminarTorneo([FromBody] Torneo torneoObj)
    {
        if (torneoObj == null)
            return BadRequest();

        var torneo = await _context.Torneos.FindAsync(torneoObj.Id);

        if (torneo == null)
            return BadRequest();

        _context.Remove(torneo);
        _context.SaveChanges();
        return Ok(new
        {
            Message = "Torneo Deletion Success"
        });
    }

    [HttpGet("get")]
    public async Task<ActionResult<IEnumerable<Torneo>>> GetAllTorneos()
    {
        var torneos = await _context.Torneos
            .Include(t => t.IdTipoTorneoNavigation).Select(t => new
            {
                Id = t.Id,
                Nombre = t.Nombre,
                FechaInicio = t.FechaInicio,
                FechaFinal = t.FechaFinal,
                TipoTorneo = new
                {
                    Nombre = t.IdTipoTorneoNavigation.Nombre
                }
            })
            .ToListAsync();

        return Ok(torneos);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Torneo>> GetTorneo(Guid id)
    {
        var torneo = await _context.Torneos.FindAsync(id);

        if (torneo == null)
            return BadRequest();

        return Ok(torneo);
    }

    [HttpGet("getTipos")]
    public async Task<ActionResult<IEnumerable<Torneo>>> GetAllTipos()
    {
        var tipos = await _context.TipoTorneos
            .ToListAsync();

        return Ok(tipos);
    }

    [HttpDelete("delete/{id}")]
    public async Task<ActionResult> DeleteTorneo(Guid id)
    {
        var torneo = await _context.Torneos.FindAsync(id);
        if (torneo == null)
        {
            return NotFound();
        }

        _context.Torneos.Remove(torneo);
        var result = await _context.SaveChangesAsync();
        return Ok(result);
    }
}
