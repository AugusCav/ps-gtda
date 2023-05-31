using System;
using System.Collections.Generic;

namespace AuthApi.Models;

public partial class Analisi
{
    public int Id { get; set; }

    public Guid? IdPartida { get; set; }

    public decimal? PromedioEvaluacion { get; set; }

    public virtual Partidum IdPartidaNavigation { get; set; }

    public virtual ICollection<Movimiento> Movimientos { get; } = new List<Movimiento>();
}
