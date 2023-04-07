using System;
using System.Collections.Generic;

namespace AuthApi.Models;

public partial class Partidum
{
    public Guid Id { get; set; }

    public Guid? JugadorBlancas { get; set; }

    public Guid? JugadorNegras { get; set; }

    public DateTime? Fecha { get; set; }

    public TimeSpan? HoraInicio { get; set; }

    public TimeSpan? HoraFinal { get; set; }

    public int? Resultado { get; set; }

    public string Pgn { get; set; }

    public int? IdRound { get; set; }

    public virtual Round IdRoundNavigation { get; set; }

    public virtual Usuario JugadorBlancasNavigation { get; set; }

    public virtual Usuario JugadorNegrasNavigation { get; set; }
}
