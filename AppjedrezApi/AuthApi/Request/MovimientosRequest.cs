using AuthApi.Models;

namespace AuthApi.Request;

public class MovimientosRequest
{
    public int IdAnalisis { get; set; }
    public List<Movimiento> Movimientos { get; set; } = new List<Movimiento>();
}
