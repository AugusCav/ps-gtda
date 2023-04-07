using System;
using System.Collections.Generic;

namespace AuthApi.Models;

public partial class RolUsuario
{
    public int Id { get; set; }

    public string Rol { get; set; }

    public virtual ICollection<Usuario> Usuarios { get; } = new List<Usuario>();
}
