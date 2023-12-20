using AuthApi.Models;

namespace AuthApi.Request;

public class RegisterTorneosRequest
{
    public List<Torneo> Torneos { get; set; }
}
