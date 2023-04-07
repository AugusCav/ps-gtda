using System;
using System.Collections.Generic;

namespace AuthApi.Models;

public partial class Inscripcion
{
    public Guid Id { get; set; }

    public Guid? IdTorneo { get; set; }

    public Guid? IdParticipante { get; set; }

    public TimeSpan? HoraInscripcion { get; set; }

    public virtual Usuario IdParticipanteNavigation { get; set; }

    public virtual Torneo IdTorneoNavigation { get; set; }
}
