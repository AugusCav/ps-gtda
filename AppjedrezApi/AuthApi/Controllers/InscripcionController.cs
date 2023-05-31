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

        var participando = await _context.Inscripcions.FirstOrDefaultAsync(p => p.IdParticipante == inscripcionObj.IdParticipante && p.IdTorneo == inscripcionObj.IdTorneo);

        if (participando != null)
            return BadRequest(new { Message = "Ya está inscripto" });

        inscripcionObj.Id = Guid.NewGuid();
        inscripcionObj.Estado = "espera";
        await _context.Inscripcions.AddAsync(inscripcionObj);
        await _context.SaveChangesAsync();
        return Ok(new
        {
            Message = "Inscripcion Register Success"
        });
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Inscripcion>>> GetAllParticipantes()
    {
        var inscripcion = await _context.Inscripcions
            .Include(i => i.IdParticipanteNavigation)
            .Select(i => new
            {
                Id = i.Id,
                IdTorneo = i.IdTorneo,
                IdParticipante = i.IdParticipante,
                HoraInscripcion = i.HoraInscripcion,
                Participante = new
                {
                    Nombres = i.IdParticipanteNavigation.Nombres,
                    Apellido = i.IdParticipanteNavigation.Apellido
                }
            })
            .ToListAsync();

        return Ok(inscripcion);
    }

    [HttpGet("get/{idTorneo}")]
    public async Task<ActionResult<IEnumerable<Inscripcion>>> GetParticipantesTorneo(Guid idTorneo)
    {
        var inscripcion = await _context.Inscripcions
            .Include(i => i.IdParticipanteNavigation)
            .Where(i => i.IdTorneo == idTorneo && i.Estado == "aprobado")
            .Select(i => new
            {
                Id = i.Id,
                IdTorneo = i.IdTorneo,
                IdParticipante = i.IdParticipante,
                HoraInscripcion = i.HoraInscripcion,
                Participante = new
                {
                    Id = i.IdParticipanteNavigation.Id,
                    Nombres = i.IdParticipanteNavigation.Nombres,
                    Apellido = i.IdParticipanteNavigation.Apellido,
                    NombreUsuario = i.IdParticipanteNavigation.NombreUsuario
                }
            })
            .ToListAsync();

        return Ok(inscripcion);
    }

    [HttpGet("getNoParticipantes/{idTorneo}")]
    public async Task<ActionResult<IEnumerable<Inscripcion>>> GetNoParticipantesTorneo(Guid idTorneo)
    {
        var inscripcion = await _context.Inscripcions
            .Include(i => i.IdParticipanteNavigation)
            .Where(i => i.IdTorneo == idTorneo && i.Estado != "aprobado")
            .Select(i => new
            {
                Id = i.Id,
                IdTorneo = i.IdTorneo,
                IdParticipante = i.IdParticipante,
                HoraInscripcion = i.HoraInscripcion,
                Estado = i.Estado,
                Participante = new
                {
                    Id = i.IdParticipanteNavigation.Id,
                    Nombres = i.IdParticipanteNavigation.Nombres,
                    Apellido = i.IdParticipanteNavigation.Apellido
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

    [HttpDelete("deleteInscripto/{idInscripto}")]
    public async Task<ActionResult> DeleteInscripto(Guid idInscripto)
    {
        var inscripto = await _context.Inscripcions.FirstOrDefaultAsync(i => i.IdParticipante == idInscripto);
        if (inscripto == null)
        {
            return NotFound();
        }

        _context.Inscripcions.Remove(inscripto);
        var result = await _context.SaveChangesAsync();
        return Ok(result);
    }

    [HttpGet("getParticipante/{id}")]
    public async Task<ActionResult> GetParticipante(Guid id)
    {
        if (id == null)
            return BadRequest(new { Message = "Ningún participante seleccionado" });

        var participante = await _context.Usuarios.FindAsync(id);
        if (participante == null)
            return NotFound(new { Message = "Participante no encontrado" });

        return Ok(participante);
    }

    [HttpGet("inscripto")]
    public async Task<ActionResult> IsInscripto([FromQuery] Guid idParticipante, [FromQuery] Guid idTorneo)
    {
        var inscripto = await _context.Inscripcions
            .FirstOrDefaultAsync(i => i.IdParticipante == idParticipante && i.IdTorneo == idTorneo);
        if (inscripto == null)
            return NotFound(new { Message = "Participante no encontrado" });

        return Ok(new { Inscripto = true });
    }

    [HttpPut("aprobar")]
    public async Task<IActionResult> AprobarInscripcion([FromBody] Inscripcion inscripcion)
    {
        var ins = await _context.Inscripcions.FindAsync(inscripcion.Id);

        if (ins == null)
            return BadRequest(new { Message = "Inscripción no encontrada" });

        ins.Estado = "aprobado";
        _context.SaveChanges();

        return Ok(new { Message = "Solicitud aprobada" });
    }

    [HttpGet("getInscripciones/{idUser}")]
    public async Task<ActionResult<IEnumerable<Inscripcion>>> GetInscripciones(Guid idUser)
    {
        var inscripciones = await _context.Inscripcions
            .Include(i => i.IdTorneoNavigation).ThenInclude(t => t.IdTipoTorneoNavigation)
            .Include(i => i.IdTorneoNavigation).ThenInclude(t => t.IdOrganizadorNavigation)
            .Where(i => i.IdParticipante == idUser)
            .Select(i => new
            {
                Id = i.Id,
                IdTorneo = i.IdTorneo,
                HoraInscripcion = i.HoraInscripcion,
                Estado = i.Estado,
                Torneo = new
                {
                    Id = i.IdTorneoNavigation.Id,
                    Nombre = i.IdTorneoNavigation.Nombre,
                    FechaInicio = i.IdTorneoNavigation.FechaInicio,
                    FechaFinal = i.IdTorneoNavigation.FechaFinal,
                    Descripcion = i.IdTorneoNavigation.Descripcion,
                    Localidad = i.IdTorneoNavigation.Localidad,
                    TipoTorneo = i.IdTorneoNavigation.IdTipoTorneoNavigation.Nombre,
                    CantidadParticipantes = i.IdTorneoNavigation.CantidadParticipantes,
                    IdOrganizador = i.IdTorneoNavigation.IdOrganizador,
                    Organizador = i.IdTorneoNavigation.IdOrganizadorNavigation.NombreUsuario

                }
            })
            .ToListAsync();

        return Ok(inscripciones);
    }

    [HttpPost("inscribirOrg")]
    public async Task<IActionResult> InscribirOrganizador([FromBody] InscripcionOrganizador inscripcionObj)
    {
        if (inscripcionObj == null)
            return BadRequest();

        var inscripto = await _context.Usuarios.FirstOrDefaultAsync(i => i.Id == inscripcionObj.IdUsuario && i.IdRolUsuario == 2);

        var inscripcion = await _context.InscripcionOrganizadors.FirstOrDefaultAsync(i => i.IdUsuario == inscripcionObj.IdUsuario && (i.EstadoPedido == "aprobado" || i.EstadoPedido == "espera"));

        if (inscripto != null)
            return BadRequest(new { Message = "Ya es organizador" });

        if (inscripcion != null)
            return BadRequest(new { Message = "Ya hay una inscripción de este usuario" });

        inscripcionObj.EstadoPedido = "espera";
        inscripcionObj.FechaPedido = DateTime.Today;
        await _context.InscripcionOrganizadors.AddAsync(inscripcionObj);
        await _context.SaveChangesAsync();
        return Ok(new
        {
            Message = "Inscripcion Register Success"
        });
    }

    [HttpPut("aprobarInscripcionOrg")]
    public async Task<IActionResult> AprobarInscripcionOrg([FromBody] InscripcionOrganizador inscripcion)
    {
        var ins = await _context.InscripcionOrganizadors.FindAsync(inscripcion.Id);

        if (ins == null)
            return BadRequest(new { Message = "Inscripción no encontrada" });

        ins.EstadoPedido = "aprobado";
        _context.SaveChanges();

        return Ok(new { Message = "Solicitud aprobada" });
    }

    [HttpPut("rechazarInscripcionOrg")]
    public async Task<IActionResult> RechazarInscripcionOrg([FromBody] InscripcionOrganizador inscripcion)
    {
        var ins = await _context.InscripcionOrganizadors.Where((i) => i.EstadoPedido == "espera" && i.Id == inscripcion.Id).FirstOrDefaultAsync();

        if (ins == null)
            return BadRequest(new { Message = "Inscripción no encontrada" });

        ins.EstadoPedido = "rechazado";
        _context.SaveChanges();

        return Ok(new { Message = "Solicitud rechazada" });
    }

    [HttpGet("getInscripcionesOrg")]
    public async Task<ActionResult<IEnumerable<InscripcionOrganizador>>> GetInscripcionesOrg()
    {
        var inscripciones = await _context.InscripcionOrganizadors
            .Include(i => i.IdUsuarioNavigation)
            .Where(i => i.EstadoPedido == "espera" || i.EstadoPedido == "aprobado")
            .Select(i => new
            {
                Id = i.Id,
                IdUsuario = i.IdUsuario,
                EstadoPedido = i.EstadoPedido,
                FechaPedido = i.FechaPedido,
                IdUsuarioNavigation = new
                {
                    Nombres = i.IdUsuarioNavigation.Nombres,
                    Apellido = i.IdUsuarioNavigation.Apellido,
                    NombreUsuario = i.IdUsuarioNavigation.NombreUsuario
                }
            })
            .ToListAsync();

        return Ok(inscripciones);
    }

    [HttpPut("aprobarOrg")]
    public async Task<IActionResult> AprobarOrg([FromBody] Usuario usuario)
    {
        var org = await _context.Usuarios.FindAsync(usuario.Id);

        if (org == null)
            return BadRequest(new { Message = "Usuario no encontrado" });

        org.IdRolUsuario = 2;
        _context.SaveChanges();

        return Ok(new { Message = "Organizador aprobado" });
    }
}
