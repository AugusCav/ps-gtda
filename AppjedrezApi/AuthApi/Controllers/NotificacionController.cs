using AuthApi.Context;
using AuthApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AuthApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class NotificacionController : ControllerBase
{
    private readonly AppDbContext _context;

    public NotificacionController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost("registrar")]
    public async Task<IActionResult> RegistrarNotificacion([FromBody] Notificacion notificacion)
    {
        if (notificacion == null)
            return BadRequest();

        notificacion.Id = Guid.NewGuid();
        notificacion.Estado = "sin leer";
        await _context.Notificacions.AddAsync(notificacion);
        await _context.SaveChangesAsync();
        return Ok(new { Message = "Notificación enviada" });
    }

    [HttpPut("actualizar")]
    public async Task<IActionResult> ActualizarNotificacion([FromBody] Notificacion notificacion)
    {
        if (notificacion == null)
            return BadRequest();

        var notif = await _context.Notificacions.FindAsync(notificacion.Id);

        if (notif == null)
            return BadRequest();

        notif.Estado = "leida";

        _context.SaveChanges();
        return Ok(new { Message = "Notificación actualizada" });
    }

    [HttpGet("getAll/{idUsuario}")]
    public async Task<ActionResult<IEnumerable<Notificacion>>> GetNotificaciones(Guid idUsuario)
    {
        var notificacion = await _context.Notificacions
        .Where(i => i.UsuarioId == idUsuario && i.Estado == "sin leer")
        .OrderByDescending(i => i.Fecha)
        .Select(i => new
        {
            Id = i.Id,
            UsuarioId = i.UsuarioId,
            TorneoId = i.TorneoId,
            Mensaje = i.Mensaje,
            Estado = i.Estado,
            Fecha = i.Fecha
        }).ToListAsync();

        return Ok(notificacion);
    }
}
