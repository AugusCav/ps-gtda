namespace AuthApi.Response;

public class OrgReportResponse
{
    public int CantidadTorneos { get; set; }
    public int? EloPromedio { get; set; }
    public int? TorneosTerminados { get; set; }
    public int? TorneosDisputandose { get; set; }
    public int? TorneosEliminados { get; set; }
}
