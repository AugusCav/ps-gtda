using System;
using System.Collections.Generic;

namespace AuthApi.Models;

public partial class TipoDni
{
    public int Id { get; set; }

    public string Tipo { get; set; }

    public virtual ICollection<Usuario> Usuarios { get; } = new List<Usuario>();
}
