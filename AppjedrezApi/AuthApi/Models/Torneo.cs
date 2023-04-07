using System;
using System.Collections.Generic;

namespace AuthApi.Models;

public partial class Torneo
{
    public Guid Id { get; set; }

    public string Nombre { get; set; }

    public DateTime? FechaInicio { get; set; }

    public DateTime? FechaFinal { get; set; }

    public string Descripcion { get; set; }

    public string Localidad { get; set; }

    public int? IdTipoTorneo { get; set; }

    public int? CantidadParticipantes { get; set; }

    public virtual TipoTorneo IdTipoTorneoNavigation { get; set; }

    public virtual ICollection<Inscripcion> Inscripcions { get; } = new List<Inscripcion>();

    public virtual ICollection<Round> Rounds { get; } = new List<Round>();
}
