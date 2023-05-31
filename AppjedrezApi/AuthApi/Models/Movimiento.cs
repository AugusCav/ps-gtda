using System;
using System.Collections.Generic;

namespace AuthApi.Models;

public partial class Movimiento
{
    public int Id { get; set; }

    public string Color { get; set; }

    public string MoveFrom { get; set; }

    public string MoveTo { get; set; }

    public string Pieza { get; set; }

    public decimal? Evaluacion { get; set; }

    public string BestMove { get; set; }

    public int? IdAnalisis { get; set; }

    public virtual Analisi IdAnalisisNavigation { get; set; }
}
