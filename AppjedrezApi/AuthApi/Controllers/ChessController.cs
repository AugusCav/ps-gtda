using AuthApi.Context;
using AuthApi.Helpers;
using AuthApi.Request;
using Microsoft.AspNetCore.Mvc;

namespace AuthApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ChessController : ControllerBase
{
    private readonly AppDbContext _context;
    Chess _chess = new Chess();

    public ChessController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost("RegistrarMovimientos")]
    public async Task<IActionResult> RegistrarMovimientos([FromBody] MovimientosRequest movimientosRequest)
    {
        if (movimientosRequest == null || movimientosRequest.Movimientos == null)
            return BadRequest(new { Message = "No hay movimientos para guardar" });

        using (var transaction = _context.Database.BeginTransaction())
        {
            try
            {
                var movimientos = movimientosRequest;

                var nuevosMovimientos = await _chess.AnalizarMovimientos(movimientos.Movimientos);



                var analisis = _context.Analises.FirstOrDefault(a => a.Id == movimientos.IdAnalisis);

                if (analisis == null)
                    throw new Exception();

                decimal? evaluacionTotal = 0;
                var i = 0;
                foreach (var move in nuevosMovimientos)
                {
                    evaluacionTotal += move.Evaluacion;
                    i++;
                }

                decimal? promedioEval = evaluacionTotal / i;

                await _context.Movimientos.AddRangeAsync(nuevosMovimientos);
                await _context.SaveChangesAsync();
                transaction.Commit();
                return Ok(new { Message = "Movimientos guardados correctamente" });
            }
            catch (Exception ex)
            {
                transaction.Rollback();
                Console.WriteLine(ex.Message);
                return StatusCode(500, new { error = ex.Message });
            }
        }
    }
}
