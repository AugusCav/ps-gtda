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
        return Ok(new { Message = "Torneo Register Success" });
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

    [HttpPut("eliminar")]
    public async Task<IActionResult> EliminarTorneo([FromBody] Torneo torneoObj)
    {
        if (torneoObj == null)
            return BadRequest();

        var torneo = await _context.Torneos.FindAsync(torneoObj.Id);

        if (torneo == null)
            return BadRequest();

        torneo.Borrado = true;
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
            .Include(t => t.IdTipoTorneoNavigation)
            .Where(t => t.Borrado != true)
            .Select(t => new
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

    [HttpGet("getRondas/{idTorneo}")]
    public async Task<ActionResult<IEnumerable<Rondum>>> GetRondas(Guid idTorneo)
    {
        var rondas = await _context.Ronda
            .Include(i => i.Partida).ThenInclude(p => p.JugadorBlancasNavigation)
            .Include(i => i.Partida).ThenInclude(p => p.JugadorNegrasNavigation)
            .Where(i => i.IdTorneo == idTorneo)
            .Select(i => new
            {
                Id = i.Id,
                Numero = i.Numero,
                Descripcion = i.Descripcion,
                IdTorneo = i.IdTorneo,
                Partida = i.Partida.Select(p => new
                {
                    Id = p.Id,
                    JugadorBlancas = p.JugadorBlancas,
                    JugadorNegras = p.JugadorNegras,
                    Fecha = p.Fecha,
                    HoraInicio = p.HoraInicio,
                    Resultado = p.Resultado,
                    Pgn = p.Pgn,
                    IdRonda = p.IdRonda,
                    JugadorBlancasNavigation = p.JugadorBlancasNavigation,
                    JugadorNegrasNavigation = p.JugadorNegrasNavigation,
                })
            })
            .ToListAsync();

        return Ok(rondas);
    }

    public class RegisterPartidasRequest
    {
        public Rondum RondaObj { get; set; }
        public List<Partidum> Partidas { get; set; }
    }

    [HttpPost("registerPartidas")]
    public async Task<IActionResult> RegisterPartidas([FromBody] RegisterPartidasRequest request)
    {
        if (request.RondaObj == null)
            return BadRequest();


        using (var transaction = _context.Database.BeginTransaction())
        {
            try
            {
                foreach (var partida in request.Partidas)
                {
                    partida.Id = Guid.NewGuid();
                    request.RondaObj.Partida.Add(partida);
                }

                await _context.Ronda.AddAsync(request.RondaObj);
                await _context.SaveChangesAsync();
                transaction.Commit();
                return Ok(new { Message = "Ronda Register Success" });
            }
            catch (Exception ex)
            {
                transaction.Rollback();
                Console.WriteLine(ex.Message);
                return StatusCode(500, new { error = ex.Message });
            }
        }
    }

    [HttpGet("getPartidas/{idUsuario}")]
    public async Task<ActionResult<IEnumerable<Partidum>>> GetPartidas(Guid idUsuario)
    {
        var partidas = await _context.Partida
            .Include(p => p.JugadorBlancasNavigation)
            .Include(p => p.JugadorNegrasNavigation)
            .Where(p => p.JugadorBlancas == idUsuario || p.JugadorNegras == idUsuario)
            .Select(p => new
            {
                Id = p.Id,
                JugadorBlancas = p.JugadorBlancas,
                JugadorNegras = p.JugadorNegras,
                Fecha = p.Fecha,
                HoraInicio = p.HoraInicio,
                Resultado = p.Resultado,
                Pgn = p.Pgn,
                IdRonda = p.IdRonda,
                JugadorBlancasNavigation = new
                {
                    Id = p.JugadorBlancasNavigation.Id,
                    NombreUsuario = p.JugadorBlancasNavigation.NombreUsuario,
                    Nombres = p.JugadorBlancasNavigation.Nombres,
                    Apellido = p.JugadorBlancasNavigation.Apellido
                },
                JugadorNegrasNavigation = new
                {
                    Id = p.JugadorNegrasNavigation.Id,
                    NombreUsuario = p.JugadorNegrasNavigation.NombreUsuario,
                    Nombres = p.JugadorNegrasNavigation.Nombres,
                    Apellido = p.JugadorNegrasNavigation.Apellido
                },
            })
            .ToListAsync();

        return Ok(partidas);
    }
}
