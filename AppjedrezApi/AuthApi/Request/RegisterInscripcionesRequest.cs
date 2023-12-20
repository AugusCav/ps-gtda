using AuthApi.Models;

namespace AuthApi.Request;

public class RegisterInscripcionesRequest
{
    public List<Inscripcion> Inscripciones { get; set; }
}
