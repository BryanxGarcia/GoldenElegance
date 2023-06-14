using GoldenEleganceProyecto.Models.Helpers;
using GoldenEleganceProyecto.Service.IServices;
using MailKit.Security;
using MimeKit.Text;
using MimeKit;
using MailKit.Net.Smtp;

namespace GoldenEleganceProyecto.Service.Services
{
    public class EmailServicio : IEmailService
    {
        private readonly IConfiguration _config;
        public EmailServicio(IConfiguration config)
        {
            _config = config;
        }

        public Task<ResponseHelper> SendEmail(EmailDTO request)
        {
            throw new NotImplementedException();
        }
    }
}
