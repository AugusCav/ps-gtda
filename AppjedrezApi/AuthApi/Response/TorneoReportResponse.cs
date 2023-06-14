namespace AuthApi.Response;

public class TorneoReportResponse
{
    public int CantidadTorneos { get; set; }
    public int? EloPromedio { get; set; }
    public List<int?> TorneosParticipadosMes { get; set; }
}
