using AuthApi.Context;
using AuthApi.Helpers;
using AuthApi.Models;
using AuthApi.Request;
using AuthApi.Response;
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

    // ENDPOINTS DE TORNEO
    // Registrar un torneo
    [HttpPost("registrar")]
    public async Task<IActionResult> RegisterTorneo([FromBody] Torneo torneoObj)
    {
        if (torneoObj == null)
            return BadRequest();

        torneoObj.Id = Guid.NewGuid();
        torneoObj.Estado = "espera";
        await _context.Torneos.AddAsync(torneoObj);
        await _context.SaveChangesAsync();
        return Ok(new { Message = "Torneo Register Success" });
    }

    // Actualizar un torneo
    [HttpPut("actualizar")]
    public async Task<IActionResult> ActualizarTorneo([FromForm] TorneoRequest torneoObj)
    {
        if (torneoObj == null)
            return BadRequest();

        var torneo = await _context.Torneos.FindAsync(torneoObj.Id);

        if (torneo == null)
            return BadRequest();

        if (torneoObj.Portada != null && torneoObj.Portada.Length > 0)
        {
            using (var memoryStream = new MemoryStream())
            {
                torneoObj.Portada.CopyTo(memoryStream);
                torneo.Portada = memoryStream.ToArray();
            }
        }

        torneo.Nombre = torneoObj.Nombre;
        torneo.Descripcion = torneoObj.Descripcion;
        torneo.FechaFinal = torneoObj.FechaFinal;
        torneo.FechaInicio = torneoObj.FechaInicio;
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

    // Eliminar un torneo
    [HttpPut("eliminar")]
    public async Task<IActionResult> EliminarTorneo([FromBody] Torneo torneoObj)
    {
        if (torneoObj == null)
            return BadRequest();

        var torneo = await _context.Torneos.FindAsync(torneoObj.Id);

        if (torneo == null)
            return BadRequest();

        torneo.Borrado = true;
        torneo.Estado = "eliminado";
        _context.SaveChanges();
        return Ok(new
        {
            Message = "Torneo Deletion Success"
        });
    }

    // Cambiar estado de torneo cuando empiece
    [HttpPut("empezar")]
    public async Task<IActionResult> EmpezarTorneo([FromBody] Torneo torneoObj)
    {
        if (torneoObj == null)
            return BadRequest();

        var torneo = await _context.Torneos
            .FindAsync(torneoObj.Id);

        if (torneo == null)
            return BadRequest();

        var inscripciones = await _context.Inscripcions.Include(i => i.IdParticipanteNavigation)
            .Where(i => i.IdTorneo == torneo.Id)
            .Select(i => new
            {
                IdParticipanteNavigation = new
                {
                    Elo = i.IdParticipanteNavigation.Elo
                }
            }
            ).ToListAsync();


        int? promedioElo = 0;
        if (inscripciones != null)
        {
            int? sumaElo = 0;
            foreach (var inscripcion in inscripciones)
            {
                sumaElo += inscripcion.IdParticipanteNavigation.Elo;
            }
            promedioElo = sumaElo / inscripciones.Count;
        }

        torneo.EloPromedio = promedioElo;
        torneo.Estado = "empezado";
        _context.SaveChanges();
        return Ok(new
        {
            Message = "Torneo Estado Updated"
        });
    }

    // Cambiar estado de un torneo cuando termine
    [HttpPut("terminar")]
    public async Task<IActionResult> TerminarTorneo([FromBody] Torneo torneoObj)
    {
        if (torneoObj == null)
            return BadRequest();

        var torneo = await _context.Torneos.FindAsync(torneoObj.Id);

        if (torneo == null)
            return BadRequest();

        torneo.Estado = "terminado";
        _context.SaveChanges();
        return Ok(new
        {
            Message = "Torneo Estado Updated"
        });
    }

    // Devolver todos los torneos
    [HttpGet("get")]
    public async Task<ActionResult<IEnumerable<Torneo>>> GetAllTorneos()
    {
        var torneos = await _context.Torneos
            .Include(t => t.IdTipoTorneoNavigation)
            .Where(t => t.Borrado != true && t.Estado == "espera")
            .OrderByDescending(i => i.FechaInicio)
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

    // Devolver un torneo por ID
    [HttpGet("{id}")]
    public async Task<ActionResult<Torneo>> GetTorneo(Guid id)
    {
        var torneo = await _context.Torneos
        .Include(t => t.IdTipoTorneoNavigation)
        .Include(t => t.IdOrganizadorNavigation)
        .Where(t => t.Id == id)
        .Select(t => new
        {
            Id = t.Id,
            Nombre = t.Nombre,
            FechaInicio = t.FechaInicio,
            FechaFinal = t.FechaFinal,
            Descripcion = t.Descripcion,
            Localidad = t.Localidad,
            IdTIpoTorneo = t.IdTipoTorneo,
            IdOrganizador = t.IdOrganizador,
            EloMinimo = t.EloMinimo,
            EloMaximo = t.EloMaximo,
            HoraInicio = t.HoraInicio,
            Borrado = t.Borrado,
            CantidadParticipantes = t.CantidadParticipantes,
            Portada = t.Portada,
            Estado = t.Estado,
            IdOrganizadorNavigation = new
            {
                Nombres = t.IdOrganizadorNavigation.Nombres,
                Apellido = t.IdOrganizadorNavigation.Apellido,
                NombreUsuario = t.IdOrganizadorNavigation.NombreUsuario
            },
            TipoTorneo = new
            {
                Nombre = t.IdTipoTorneoNavigation.Nombre
            }
        })
        .FirstOrDefaultAsync();

        if (torneo == null)
            return BadRequest();

        return Ok(torneo);
    }

    // Devolver portada de torneo
    [HttpGet("getPortada/{id}")]
    public async Task<ActionResult> GetPortada(Guid id)
    {
        var torneo = await _context.Torneos.FirstOrDefaultAsync(t => t.Id == id);

        if (torneo == null || torneo.Portada == null)
            return BadRequest();

        byte[] bytes = null;
        string sBase64String = Convert.ToBase64String(torneo.Portada);
        if (!string.IsNullOrEmpty(sBase64String))
        {
            bytes = Convert.FromBase64String(sBase64String);
        }

        return Ok(bytes);
    }


    // Devolver un torneo por ID de organizador
    [HttpGet("GetTorneoOrganizador/{id}")]
    public async Task<ActionResult<IEnumerable<Torneo>>> GetTorneoOrganizador(Guid id)
    {
        var torneos = await _context.Torneos
        .Include(t => t.IdTipoTorneoNavigation)
        .Include(t => t.IdOrganizadorNavigation)
        .Where(t => t.IdOrganizador == id)
        .OrderByDescending(t => t.FechaInicio)
        .Select(t => new
        {
            Id = t.Id,
            Nombre = t.Nombre,
            FechaInicio = t.FechaInicio,
            FechaFinal = t.FechaFinal,
            Descripcion = t.Descripcion,
            Localidad = t.Localidad,
            IdTIpoTorneo = t.IdTipoTorneo,
            IdOrganizador = t.IdOrganizador,
            EloMinimo = t.EloMinimo,
            EloMaximo = t.EloMaximo,
            HoraInicio = t.HoraInicio,
            Borrado = t.Borrado,
            CantidadParticipantes = t.CantidadParticipantes,
            Portada = t.Portada,
            Estado = t.Estado,
            IdOrganizadorNavigation = new
            {
                Nombres = t.IdOrganizadorNavigation.Nombres,
                Apellido = t.IdOrganizadorNavigation.Apellido,
                NombreUsuario = t.IdOrganizadorNavigation.NombreUsuario
            },
            TipoTorneo = new
            {
                Nombre = t.IdTipoTorneoNavigation.Nombre
            }
        })
        .ToListAsync();

        if (torneos == null)
            return BadRequest();

        return Ok(torneos);
    }

    // Devolver los tipos de torneos existentes
    [HttpGet("getTipos")]
    public async Task<ActionResult<IEnumerable<Torneo>>> GetAllTipos()
    {
        var tipos = await _context.TipoTorneos
            .ToListAsync();

        return Ok(tipos);
    }

    // Eliminar un torneo por completo (Ver antes el eliminado lógico)
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

    // ENDPOINTS DE RONDAS Y PARTIDAS
    // Devolver todas las rondas de un torneo
    [HttpGet("getRondas/{idTorneo}")]
    public async Task<ActionResult<IEnumerable<Rondum>>> GetRondas(Guid idTorneo)
    {
        var rondas = await _context.Ronda
            .Include(i => i.Partida).ThenInclude(p => p.JugadorBlancasNavigation)
            .Include(i => i.Partida).ThenInclude(p => p.JugadorNegrasNavigation)
            .Where(i => i.IdTorneo == idTorneo)
            .OrderBy(i => i.Id)
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

    // Registrar las partidas de un torneo junto con su ronda
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
                    partida.Estado = "no jugada";
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

    // Devolver todas las partidas de un usuario específico
    [HttpGet("getPartidas/{idUsuario}")]
    public async Task<ActionResult<IEnumerable<Partidum>>> GetPartidas(Guid idUsuario)
    {
        var partidas = await _context.Partida
            .Include(p => p.JugadorBlancasNavigation)
            .Include(p => p.JugadorNegrasNavigation)
            .Where(p => p.JugadorBlancas == idUsuario || p.JugadorNegras == idUsuario)
            .OrderByDescending(p => p.Fecha)
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

    // Devolver una partida por su ID
    [HttpGet("getPartida/{idPartida}")]
    public async Task<ActionResult<Partidum>> GetPartida(Guid idPartida)
    {
        var partida = await _context.Partida
            .Include(p => p.JugadorBlancasNavigation)
            .Include(p => p.JugadorNegrasNavigation)
            .Include(p => p.IdRondaNavigation).ThenInclude(r => r.IdTorneoNavigation)
            .Where(p => p.Id == idPartida)
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
                IdRondaNavigation = new
                {
                    IdTorneo = p.IdRondaNavigation.IdTorneo,
                    Torneo = new
                    {
                        IdOrganizador = p.IdRondaNavigation.IdTorneoNavigation.IdOrganizador
                    }
                }
            })
            .FirstOrDefaultAsync();

        if (partida == null)
            BadRequest(new { Message = "Partida no encontrada" });

        return Ok(partida);
    }

    // Cargar un PGN a una partida
    [HttpPut("cargarPgn")]
    public async Task<IActionResult> CargarPgn([FromBody] CargarPgnRequest pgn)
    {
        if (pgn == null)
            return BadRequest();
        var partida = await _context.Partida.FindAsync(pgn.IdPartida);

        if (partida == null)
            return BadRequest();

        partida.Resultado = pgn.Resultado;
        partida.Pgn = pgn.pgn;
        partida.Estado = "jugada";
        _context.SaveChanges();
        return Ok(new
        {
            Message = "Partida Update Success"
        });
    }

    // Devolver el análisis de una partida
    [HttpGet("getAnalisis/{idPartida}")]
    public async Task<ActionResult<Analisi>> GetAnalisis(Guid idPartida)
    {

        var analisis = await _context.Analises
            .Include(a => a.Movimientos)
            .Where(a => a.IdPartida == idPartida)
            .Select(a => new
            {
                Id = a.Id,
                IdPartida = a.IdPartida,
                PromedioEvaluacion = a.PromedioEvaluacion,
                Movimientos = a.Movimientos.Select(m => new
                {
                    Id = m.Id,
                    Color = m.Color,
                    MoveFrom = m.MoveFrom,
                    MoveTo = m.MoveTo,
                    Pieza = m.Pieza,
                    Evaluacion = m.Evaluacion,
                    BestMove = m.BestMove,
                })

            })
            .FirstOrDefaultAsync();

        if (analisis == null)
            return NotFound();


        return Ok(analisis);
    }

    // Registrar un análisis de una partida
    [HttpPost("registrarAnalisis")]
    public async Task<ActionResult<int>> RegistrarAnalisis([FromBody] Analisi analisisObj)
    {
        if (analisisObj == null)
            return BadRequest();

        var analisis = await _context.Analises.Where(a => a.IdPartida == analisisObj.IdPartida).FirstOrDefaultAsync();

        if (analisis == null)
        {
            analisis = analisisObj;
            await _context.Analises.AddAsync(analisis);
            await _context.SaveChangesAsync();


        }
        else
        {
            return BadRequest(new { Message = "Analisis ya existe" });
        }

        return Ok(analisis.Id);
    }


    // ENDPOINTS DE REPORTES
    // Devolver reporte de torneos para usuario
    [HttpGet("reporteTorneoUser/{idUser}")]
    public async Task<ActionResult<TorneoReportResponse>> ReporteTorneoUser(Guid idUser)
    {
        var torneos = await _context.Inscripcions.Include(i => i.IdTorneoNavigation)
            .ThenInclude(t => t.Inscripcions)
            .Where(i => i.IdParticipante == idUser && i.Estado == "aprobado")
            .Select(i => new
            {
                IdTorneoNavigation = new
                {
                    Id = i.IdTorneoNavigation.Id,
                    Estado = i.IdTorneoNavigation.Estado,
                    EloPromedio = i.IdTorneoNavigation.EloPromedio,
                    FechaInicio = i.IdTorneoNavigation.FechaInicio
                }
            })
            .ToListAsync();

        if (torneos == null)
            NotFound(new { Message = "No se encontraron torneos" });

        int? total = 0;
        int? totalPromedios = 0;
        int? promedioElo = 0;

        List<int> jugadosPorMes = new int[12].ToList();

        foreach (var torneo in torneos)
        {
            if (torneo.IdTorneoNavigation.Estado == "empezado" || torneo.IdTorneoNavigation.Estado == "terminado")
            {
                totalPromedios += torneo.IdTorneoNavigation.EloPromedio;
                total++;

                if (torneo.IdTorneoNavigation.FechaInicio != null)
                {
                    var fecha = (DateTime)torneo.IdTorneoNavigation.FechaInicio;
                    if (Fechas.IsSameYear(fecha, DateTime.Now))
                    {
                        var mes = fecha.Month - 1;
                        jugadosPorMes[mes]++;
                    }
                }
            }
        }

        if (totalPromedios != 0)
        {
            promedioElo = totalPromedios / total;
        }

        var result = new { CantidadTorneos = total, EloPromedio = promedioElo, TorneosParticipadosMes = jugadosPorMes };

        return Ok(result);
    }

    // Devolver reporte torneos de organizador
    [HttpGet("reporteTorneoOrg/{idOrganizador}")]
    public async Task<ActionResult<OrgReportResponse>> ReporteTorneoOrg(Guid idOrganizador)
    {

        var torneos = await _context.Torneos
            .Where(t => t.IdOrganizador == idOrganizador)
            .Select(t => new
            {
                Id = t.Id,
                Estado = t.Estado,
                EloPromedio = t.EloPromedio,
                FechaInicio = t.FechaInicio
            })
            .ToListAsync();

        if (torneos == null)
            NotFound(new { Message = "No se encontraron torneos" });

        int? total = 0;
        int? totalConPromedio = 0;
        int? totalPromedios = 0;
        int? promedioElo = 0;
        int? torneosTerminados = 0;
        int? torneosDisputandose = 0;
        int? torneosEliminados = 0;

        foreach (var torneo in torneos)
        {
            if (torneo.Estado == "empezado" || torneo.Estado == "terminado" || torneo.Estado == "espera")
            {
                total++;
                if (torneo.EloPromedio != null)
                {
                    totalPromedios += torneo.EloPromedio;
                    totalConPromedio++;
                }

                switch (torneo.Estado)
                {
                    case "terminado":
                        torneosTerminados++;
                        break;
                    case "empezado":
                        torneosDisputandose++;
                        break;
                    case "eliminado":
                        torneosEliminados++;
                        break;
                    default:
                        break;
                }
            }
        }

        promedioElo = totalPromedios / totalConPromedio;

        var result = new
        {
            CantidadTorneos = total,
            EloPromedio = promedioElo,
            TorneosTerminados = torneosTerminados,
            TorneosDisputandose = torneosDisputandose,
            TorneosEliminados = torneosEliminados
        };

        return Ok(result);
    }

    // Devolver reporte de partidas de un usuario
    [HttpGet("reportePartidasUser/{idUser}")]
    public async Task<ActionResult<PartidaReportResponse>> ReportePartidasUser(Guid idUser)
    {

        var partidas = await _context.Partida
            .Include(p => p.Analisis)
            .Where(p => (p.JugadorBlancas == idUser || p.JugadorNegras == idUser) && p.Estado == "jugada")
            .Select(p => new
            {
                Id = p.Id,
                JugadorBlancas = p.JugadorBlancas,
                JugadorNegras = p.JugadorNegras,
                Estado = p.Estado,
                Pgn = p.Pgn,
                Resultado = p.Resultado,
                Analisis = p.Analisis.FirstOrDefault(),
                Fecha = p.Fecha
            })
            .ToListAsync();

        if (partidas == null)
            NotFound(new { Message = "No se encontraron torneos" });



        int jugadas = 0;
        int perdidas = 0;
        int ganadas = 0;
        int empatadas = 0;
        int porcentajePerdidas = 0;
        int porcentajeGanadas = 0;
        int porcentajeEmpatadas = 0;
        List<int> jugadasPorMes = new int[12].ToList();
        List<int> ganadasPorMes = new int[12].ToList();
        List<int> perdidasPorMes = new int[12].ToList();
        List<int> empatadasPorMes = new int[12].ToList();

        foreach (var partida in partidas)
        {
            jugadas++;
            if (idUser == partida.JugadorBlancas)
            {
                switch (partida.Resultado)
                {
                    case -1:
                        perdidas++;
                        break;
                    case 1:
                        ganadas++;
                        break;
                    case 0:
                        empatadas++;
                        break;
                    default:
                        break;
                }
            }
            else if (idUser == partida.JugadorNegras)
            {
                switch (partida.Resultado)
                {
                    case -1:
                        ganadas++;
                        break;
                    case 1:
                        perdidas++;
                        break;
                    case 0:
                        empatadas++;
                        break;
                    default:
                        break;
                }
            }

            if (partida.Fecha != null)
            {
                var fecha = (DateTime)partida.Fecha;
                if (Fechas.IsSameYear(fecha, DateTime.Now))
                {
                    var mes = fecha.Month - 1;
                    jugadasPorMes[mes]++;

                    if (idUser == partida.JugadorBlancas)
                    {
                        switch (partida.Resultado)
                        {
                            case -1:
                                perdidasPorMes[mes]++;
                                break;
                            case 1:
                                ganadasPorMes[mes]++;
                                break;
                            case 0:
                                empatadasPorMes[mes]++;
                                break;
                            default:
                                break;
                        }
                    }
                    else if (idUser == partida.JugadorNegras)
                    {
                        switch (partida.Resultado)
                        {
                            case -1:
                                ganadasPorMes[mes]++;
                                break;
                            case 1:
                                perdidasPorMes[mes]++;
                                break;
                            case 0:
                                empatadasPorMes[mes]++;
                                break;
                            default:
                                break;
                        }
                    }
                }
            }
        }

        if (jugadas != 0)
        {
            porcentajePerdidas = (perdidas * 100) / jugadas;
            porcentajeGanadas = (ganadas * 100) / jugadas;
            porcentajeEmpatadas = (empatadas * 100) / jugadas;
        }

        var result = new
        {
            Jugadas = jugadas,
            Perdidas = perdidas,
            Ganadas = ganadas,
            Empatadas = empatadas,
            PorcentajePerdidas = porcentajePerdidas,
            PorcentajeGanadas = porcentajeGanadas,
            PorcentajeEmpatadas = porcentajeEmpatadas,
            JugadasPorMes = jugadasPorMes,
            GanadasPorMes = ganadasPorMes,
            PerdidasPorMes = perdidasPorMes,
            EmpatadasPorMes = empatadasPorMes
        };
        return Ok(result);
    }

}
