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
        public async Task<ResponseHelper> SendEmail(EmailDTO request)
        {
            ResponseHelper rh = new ResponseHelper();

            var emailAdmin = new MimeMessage();
            emailAdmin.To.Add(MailboxAddress.Parse(_config.GetSection("Email:Username").Value));
            emailAdmin.From.Add(MailboxAddress.Parse(request.Para));
            emailAdmin.Subject = "Mensaje de Contacto para Golden Elegance";

            emailAdmin.Body = new TextPart(TextFormat.Text)
            {
                Text = request.Contenido,
            };


            var emailCliente = new MimeMessage();
            emailCliente.To.Add(MailboxAddress.Parse(request.Para));
            emailCliente.From.Add(MailboxAddress.Parse(_config.GetSection("Email:Username").Value));
            emailCliente.Subject = "Mensaje de Contacto para Golden Elegance";
            emailCliente.Body = new TextPart(TextFormat.Text)
            {
                Text = "Gracias por contactarnos con nosotros. En cuanto podamos nosotros te contactaremos",
            };

            using var smtp = new SmtpClient();
            smtp.Connect(
                _config.GetSection("Email:Host").Value,
                Convert.ToInt32(_config.GetSection("Email:Port").Value),
                SecureSocketOptions.StartTls
                );

            smtp.Authenticate(
                _config.GetSection("Email:Username").Value,
                _config.GetSection("Email:Password").Value
                );

           var respuestaAdmin = await smtp.SendAsync(emailAdmin);
            var respuestaUser = await smtp.SendAsync(emailCliente);

            if (respuestaAdmin == null || respuestaUser == null)
            {
                rh.Success = false;
                rh.Message = "Tu solicitud de contacto no fue enviada correctamente. Intentalo mas tarde";
                rh.HelperData = "Envio de informacion incorrecta";

            }
            rh.Success = true;
            rh.Message = "Tu solicitud de contacto fue enviada correctamente";
            rh.HelperData = "Envio de informacion correcta";

            smtp.Disconnect(true);

            return rh;

        }

    }
}