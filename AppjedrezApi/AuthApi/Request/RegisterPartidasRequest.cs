using AuthApi.Models;

namespace AuthApi.Request;

public class RegisterPartidasRequest
{
    public Rondum RondaObj { get; set; }
    public List<Partidum> Partidas { get; set; }
}