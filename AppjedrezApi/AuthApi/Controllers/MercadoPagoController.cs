using System.Text;
using MercadoPago.Client.Preference;
using MercadoPago.Config;
using MercadoPago.Resource.Preference;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
namespace AuthApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MercadoPagoController : ControllerBase
{
    private readonly string accessToken;

    [HttpGet("getPreferencia")]
    public async Task<ActionResult> CrearPreferencia()
    {
        MercadoPagoConfig.AccessToken = ***REMOVED***;

        var request = new PreferenceRequest
        {
            Items = new List<PreferenceItemRequest>
            {
                new PreferenceItemRequest
                {
                    Title = "Inscripcion",
                    Quantity = 1,
                    CurrencyId = "ARS",
                    UnitPrice = 100,
                },
            },
            BackUrls = new PreferenceBackUrlsRequest
            {
                Success = "http://localhost:4200/app/success",
                Failure = "http://localhost:4200/app/failure",
                Pending = ""
            },
            AutoReturn = "approved"
        };

        // Crea la preferencia usando el client
        var client = new PreferenceClient();
        Preference preference = await client.CreateAsync(request);

        return Ok(preference);
    }
}
