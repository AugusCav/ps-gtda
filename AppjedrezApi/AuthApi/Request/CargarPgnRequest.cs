namespace AuthApi.Request;

public class CargarPgnRequest
{
    public String pgn { get; set; }
    public Guid IdPartida { get; set; }
    public int? Resultado { get; set; }
}