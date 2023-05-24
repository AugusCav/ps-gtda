using System;
using System.Collections.Generic;

namespace AuthApi.Models;

public partial class Analisi
{
    public int Id { get; set; }

    public Guid? Partida { get; set; }

    public DateTime? Fecha { get; set; }

    public virtual Partidum PartidaNavigation { get; set; }
}
