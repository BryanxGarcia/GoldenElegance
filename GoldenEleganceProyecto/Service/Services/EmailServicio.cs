using GoldenEleganceProyecto.Models.Helpers;
using GoldenEleganceProyecto.Service.IServices;
using MailKit.Security;
using MimeKit.Text;
using MimeKit;
using MailKit.Net.Smtp;
using GoldenEleganceProyecto.Context;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;

namespace GoldenEleganceProyecto.Service.Services
{
    public class EmailServicio : IEmailService
    {
        private readonly IConfiguration _config;
        private readonly ApplicationDbContext _context;

        public EmailServicio(IConfiguration config, ApplicationDbContext context)
        {
            _context = context;
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

        public async Task<ResponseHelper> SendEmailConfirmacionCorreo(string correoConfirmar)
        {
            try
            {
                var user = await _context.Usuario.FirstOrDefaultAsync(a => a.Correo == correoConfirmar);

                if (user == null)
                    return new ResponseHelper { Success = false, Message = "Error no se pudo encontrar ese usuario" };

                var tokenBytes = RandomNumberGenerator.GetBytes(64);
                var emailtoken = Convert.ToBase64String(tokenBytes);
                user.ConfirmarEmailToken = emailtoken;
                user.ConfirmarEmailExpiry = DateTime.Now.AddMinutes(45);

                var email = new MimeMessage();
                email.To.Add(MailboxAddress.Parse(correoConfirmar));
                email.From.Add(MailboxAddress.Parse(_config.GetSection("Email:Username").Value));
                email.Subject = "Mensaje para confirmacion de correo electronico";

                email.Body = new TextPart(TextFormat.Html)
                {
                    Text = $@"<html>

<head>
  <meta charset=""UTF-8"">
  <title>Bienvenido</title>
  <style>
    body {{
      font-family: Arial, sans-serif;
      background-color: #f2f2f2;
      margin: 0;
      padding: 0;
    }}
    
    .container {{
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #fff;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }}
    
    h1 {{
      color: #333;
      text-align: center;
    }}
    
    p {{
      color: #555;
      line-height: 1.5;
    }}
    
    a {{
      color: #007bff;
      text-decoration: none;
      font-weight: bold;
    }}
  </style>
</head>
<body>
  <div class=""container"">
    <h1>Título de Bienvenida</h1>
    <p>¡Hola! Gracias por registrarte en nuestro sitio web.</p>
    <p>Aquí tienes un enlace que puedes seguir para confirmar tu correo:</p>
    <p><a href = ""http://localhost:4200/auth/confirmacion?email={correoConfirmar}&code={emailtoken}"">Confirmar correo </a></p>
  </div>
</body>

                
                    </html>"
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

                var respuestaAdmin = await smtp.SendAsync(email);

                _context.Entry(user).State = EntityState.Modified;
                await _context.SaveChangesAsync();

                if (respuestaAdmin != null)
                {
                    return new ResponseHelper { Success = false, Message = "No se envio el correo" };
                }
                return new ResponseHelper { Success = true, Message = "Se envio correctamente la confirmacion del correo" };
            }
            catch (Exception ex)
            {
                return new ResponseHelper { Success = false, Message = ex.Message };


            }
        }

        public async Task<ResponseHelper> SendEmailResetPassword(string correo)
        {
            try
            {
                var user = await _context.Usuario.FirstOrDefaultAsync(a => a.Correo == correo);

                if (user == null)
                    return new ResponseHelper { Success = false, Message = "Error no se pudo encontrar ese usuario" };

                var tokenBytes = RandomNumberGenerator.GetBytes(64);
                var emailtoken = Convert.ToBase64String(tokenBytes);
                user.ResetPasswordToken = emailtoken;
                user.ResetPasswordExpiry = DateTime.Now.AddMinutes(15);

                var email = new MimeMessage();
                email.To.Add(MailboxAddress.Parse(correo));
                email.From.Add(MailboxAddress.Parse(_config.GetSection("Email:Username").Value));
                email.Subject = "Mensaje para recuperacion de contraseña para Golden Elegance";

                email.Body = new TextPart(TextFormat.Html)
                {
                    Text = $@"<html>
                <a href = ""http://localhost:4200/auth/reset?email={correo}&code={emailtoken}"">Resett password </a>
                    </html>"
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

                var respuestaAdmin = await smtp.SendAsync(email);

                _context.Entry(user).State = EntityState.Modified;
                await _context.SaveChangesAsync();

                if (respuestaAdmin != null)
                {
                    return new ResponseHelper { Success = false, Message = "No se envio el correo" };
                }
                return new ResponseHelper { Success = true, Message = "Se envio correctamente la contraseña" };
            }
            catch (Exception ex)
            {
                return new ResponseHelper { Success = false, Message = ex.Message };


            }

        }


    }
}