namespace AuthApi.Request;

public class UserRequest
{
     public Guid Id { get; set; }

    public string NombreUsuario { get; set; }

    public string Nombres { get; set; }

    public string Apellido { get; set; }

    public string Email { get; set; }

    public string Telefono { get; set; }

    public IFormFile FotoPerfil { get; set; }

    public int? Elo { get; set; }

}
