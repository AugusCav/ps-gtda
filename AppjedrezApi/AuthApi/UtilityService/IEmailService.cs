using AuthApi.Models;

namespace AuthApi.UtilityService;

public interface IEmailService
{
    void SendEmail(EmailModel emailModel);
}
