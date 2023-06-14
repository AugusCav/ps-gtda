namespace AuthApi.Helpers;

public class Fechas
{
    public static bool IsSameYear(DateTime fecha1, DateTime fecha2)
    {
        return fecha1.Year == fecha2.Year;
    }
}
