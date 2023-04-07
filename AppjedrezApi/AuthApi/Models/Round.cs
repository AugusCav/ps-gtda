using System;
using System.Collections.Generic;

namespace AuthApi.Models;

public partial class Round
{
    public int Id { get; set; }

    public int? Numero { get; set; }

    public string Descripcion { get; set; }

    public Guid? IdTorneo { get; set; }

    public virtual Torneo IdTorneoNavigation { get; set; }

    public virtual ICollection<Partidum> Partida { get; } = new List<Partidum>();
}
