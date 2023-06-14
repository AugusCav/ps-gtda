using System;
using System.Collections.Generic;

namespace AuthApi.Models;

public partial class Torneo
{
    public Guid Id { get; set; }

    public string Nombre { get; set; }

    public DateTime? FechaInicio { get; set; }

    public string Descripcion { get; set; }

    public string Localidad { get; set; }

    public int? IdTipoTorneo { get; set; }

    public int? CantidadParticipantes { get; set; }

    public Guid? IdOrganizador { get; set; }

    public int? EloMinimo { get; set; }

    public int? EloMaximo { get; set; }

    public TimeSpan? HoraInicio { get; set; }

    public bool? Borrado { get; set; }

    public byte[] Portada { get; set; }

    public DateTime? FechaFinal { get; set; }

    public int? EloPromedio { get; set; }

    public string Estado { get; set; }

    public virtual Usuario IdOrganizadorNavigation { get; set; }

    public virtual TipoTorneo IdTipoTorneoNavigation { get; set; }

    public virtual ICollection<Inscripcion> Inscripcions { get; } = new List<Inscripcion>();

    public virtual ICollection<Rondum> Ronda { get; } = new List<Rondum>();
}
