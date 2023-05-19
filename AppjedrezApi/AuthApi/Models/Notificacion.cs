using System;
using System.Collections.Generic;

namespace AuthApi.Models;

public partial class Notificacion
{
    public Guid Id { get; set; }

    public Guid? UsuarioId { get; set; }

    public string Mensaje { get; set; }

    public string Estado { get; set; }

    public DateTime? Fecha { get; set; }

    public virtual Usuario Usuario { get; set; }
}
