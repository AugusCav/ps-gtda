using System;
using System.Collections.Generic;

namespace AuthApi.Models;

public partial class Usuario
{
    public Guid Id { get; set; }

    public string NombreUsuario { get; set; }

    public string Clave { get; set; }

    public string Nombres { get; set; }

    public string Apellido { get; set; }

    public string Email { get; set; }

    public string Telefono { get; set; }

    public int? IdRolUsuario { get; set; }

    public string Token { get; set; }

    public byte[] FotoPerfil { get; set; }

    public virtual RolUsuario IdRolUsuarioNavigation { get; set; }

    public virtual ICollection<InscripcionOrganizador> InscripcionOrganizadors { get; } = new List<InscripcionOrganizador>();

    public virtual ICollection<Inscripcion> Inscripcions { get; } = new List<Inscripcion>();

    public virtual ICollection<Notificacion> Notificacions { get; } = new List<Notificacion>();

    public virtual ICollection<Partidum> PartidumJugadorBlancasNavigations { get; } = new List<Partidum>();

    public virtual ICollection<Partidum> PartidumJugadorNegrasNavigations { get; } = new List<Partidum>();

    public virtual ICollection<Torneo> Torneos { get; } = new List<Torneo>();
}
