using AuthApi.Models;

namespace AuthApi.Request;

public class TorneoRequest
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

    public IFormFile Portada { get; set; }

    public DateTime? FechaFinal { get; set; }

    public int? EloPromedio { get; set; }

}
