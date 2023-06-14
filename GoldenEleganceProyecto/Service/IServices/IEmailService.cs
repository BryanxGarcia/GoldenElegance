

using GoldenEleganceProyecto.Models.Helpers;

namespace GoldenEleganceProyecto.Service.IServices
{
    public interface IEmailService
    {
        Task<ResponseHelper> SendEmail(EmailDTO request);

    }
}
