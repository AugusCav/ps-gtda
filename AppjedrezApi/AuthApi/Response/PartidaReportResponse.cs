namespace AuthApi.Response;

public class PartidaReportResponse
{
    public int Jugadas { get; set; }
    public int Perdidas { get; set; }
    public int Ganadas { get; set; }
    public int Empatadas { get; set; }
    public int PorcentajePerdidas { get; set; }
    public int PorcentajeGanadas { get; set; }
    public int PorcentajeEmpatadas { get; set; }
    public decimal PromedioEvalTotal { get; set; }
    public List<int> JugadasPorMes { get; set; }
    public List<int> GanadasPorMes {get; set;}
    public List<int> PerdidasPorMes {get; set;}
    public List<int> EmpatadasPorMes {get; set;}
    
}
