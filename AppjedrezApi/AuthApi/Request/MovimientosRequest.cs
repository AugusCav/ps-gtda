using AuthApi.Models;

namespace AuthApi.Request;

public class MovimientosRequest
{
    public int IdAnalisis;
    public ICollection<Movimiento> Movimientos { get; set; } = new List<Movimiento>();
}
