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
        torneo.Localidad = torneoObj.Localidad;
        torneo.IdTipoTorneo = torneoObj.IdTipoTorneo;
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
        var torneos = await _context.Torneos.ToListAsync<Torneo>();

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
}
