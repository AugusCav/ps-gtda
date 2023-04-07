using System;
using System.Collections.Generic;

namespace AuthApi.Models;

public partial class TipoTorneo
{
    public int Id { get; set; }

    public string Nombre { get; set; }

    public string Descripcion { get; set; }

    public virtual ICollection<Torneo> Torneos { get; } = new List<Torneo>();
}
