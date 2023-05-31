using System;
using System.Collections.Generic;

namespace AuthApi.Models;

public partial class InscripcionOrganizador
{
    public int Id { get; set; }

    public Guid? IdUsuario { get; set; }

    public DateTime? FechaPedido { get; set; }

    public string EstadoPedido { get; set; }

    public virtual Usuario IdUsuarioNavigation { get; set; }
}
