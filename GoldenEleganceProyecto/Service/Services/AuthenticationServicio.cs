using GoldenEleganceProyecto.Context;
using GoldenEleganceProyecto.Models;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics.Contracts;
using System.Security.Claims;
using GoldenEleganceProyecto.Models.Helpers;
using Microsoft.AspNetCore.Mvc;
using GoldenEleganceProyecto.Service.IServices;
using System.Text;
using System.Text.RegularExpressions;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Cryptography;
using MimeKit;
using MailKit.Security;
using MimeKit.Text;
using MimeKit;
using MailKit.Net.Smtp;

namespace GoldenEleganceProyecto.Service.Services
{
    public class AuthenticationServicio : IAuthenticationServicio
    {
        private readonly IConfiguration _config;
        private readonly ApplicationDbContext _context;
        private readonly ILogger<Usuarios> _logger;

        public AuthenticationServicio(ApplicationDbContext context, ILogger<Usuarios> logger, IConfiguration config)
        {
            _logger = logger;
            _context = context;
            _config = config;


        }

        public async Task<IResponseToken> LoginUsuario(Usuarios usuario)
        {

            if (usuario == null)
                return new IResponseToken { Success = false, HelperData = "No se encontro el usuario", Message = "El usuario no pudo ser encontrado" };


            var user = await _context.Usuario.FirstOrDefaultAsync(x => x.Correo == usuario.Correo);

            if (user == null)
                return new IResponseToken { Success = false, HelperData = "No se encontro el usuario revise el correo o contraseña", Message = "El usuario no pudo ser encontrado" };

            if (!PasswordHasher.VerifyPassword(usuario.Password, user.Password))
            {
                return new IResponseToken
                {
                    Success = false,
                    HelperData = "No se encontro el usuario revise el correo o contraseña",
                    Message = "El usuario no pudo ser encontrado",
                };
            }

            user.Token = CreateJwtToken(user);
            var newAccessToken = user.Token;
            var newRefreshtoken = CreateRefreshToken();
            user.RefreshToken = newAccessToken;
            await _context.SaveChangesAsync();

            return new IResponseToken
            {
                Success = true,
                HelperData = "Correcto",
                Token= newAccessToken,
                RefreshToken = newRefreshtoken,
                Message = "Inicio de sesion correcto"
            };
        }

        public async Task<ResponseHelper> RegistrarUsuario(Usuarios usuario)
        {
            try
            {
                if (usuario == null)
                    return new ResponseHelper { Success = false, Message = "Necesitas rellenar los campos solicitados" };

                //Checar Username
                if (await CheckUsernameExist(usuario.Username))
                    return new ResponseHelper { Success = false, Message = "Username ya esta en uso" };

                //Checar Email
                if (await CheckEmailExist(usuario.Correo))
                    return new ResponseHelper { Success = false, Message = "Correo electronico ya esta en uso" };


                //Checar contraseña
                var checkpass = CheckPasswordStrength(usuario.Password);

                if (!string.IsNullOrEmpty(checkpass))
                    return new ResponseHelper { Success = false, Message = checkpass.ToString() };


                usuario.FKRol = 2;
                usuario.RowVersion = DateTime.Now;
                usuario.EmailConfirmed = false;
                usuario.IsDeleted = false;
                usuario.Token = "vacio";
                usuario.Password = PasswordHasher.HashPassword(usuario.Password);

                var resp = await _context.Usuario.AddAsync(usuario);
                var respu = await _context.SaveChangesAsync();
                if (resp != null && respu > 0)
                {
                    return new ResponseHelper { Success = true, Message = "El usuario fue creado correctamente" };

                }
                else
                {
                    return new ResponseHelper { Success = false, Message = "El usuario no fue creado correctamente" };

                }
            }
            catch (Exception ex)
            {
                return new ResponseHelper { Success = false, Message = ex.Message };


            }
        }


        public Task<Usuarios> ObtenerUsuario(int? Id)
        {
            throw new NotImplementedException();
        }

        public async Task<ResponseHelper> ResetPasswor2(string correo)
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

        // public static string EmailStringBody(string email, string emailToken)
        //{
        //    return $@"<html>
        //        <a href = ""https://localhost:44397/reset?email={email}&code={emailToken}"">Resett password </a>
        //            </html>";

        //}

        private async Task<bool> CheckUsernameExist(string username)
        {
            return await _context.Usuario.AnyAsync(u => u.Username == username);
        }
        private async Task<bool> CheckEmailExist(string email)
        {
            return await _context.Usuario.AnyAsync(u => u.Correo == email);
        }
        private string CheckPasswordStrength(string pass)
        {
            StringBuilder sb = new StringBuilder();
            if (pass.Length < 8)
            {
                sb.Append("La contraseña debe contener al menos 8 caracteres" + Environment.NewLine);
            }
            if (!(Regex.IsMatch(pass, "[a-z]") && Regex.IsMatch(pass, "[A-Z]") &&
                Regex.IsMatch(pass, "[0-9]")))
            {
                sb.Append("La contraseña deberia tener caracteres alphanumerico" + Environment.NewLine);
            }
            if (!Regex.IsMatch(pass, "[<,>,@,!,#,$,%,^,&,*,(,),_,+,\\[,\\],{,},?,:,;,|,',\\,./,~,`,-,=]"))
            {
                sb.Append("La contraseña deberia tener caracteres especiales" + Environment.NewLine);
            }

            return sb.ToString();
        }

        private string CreateJwtToken(Usuarios usuario)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("muchosecrete.....");
            var identity = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Role,  $"{usuario.FKRol}"),
                new Claim(ClaimTypes.Name, $"{usuario.Username}"),
            });
            var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = identity,
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = credentials
            };
            var token = jwtTokenHandler.CreateToken(tokenDescriptor);

            return jwtTokenHandler.WriteToken(token);
        }

        private string CreateRefreshToken()
        {
            var tokenBytes = RandomNumberGenerator.GetBytes(64);
            var refreshToken = Convert.ToBase64String(tokenBytes);

            var tokenInUser = _context.Usuario
                .Any(a=>a.RefreshToken == refreshToken);

            if(tokenInUser)
            {
                return CreateRefreshToken();
            }
            return refreshToken;
        }

        private ClaimsPrincipal GetPrincipleFromExpiredToken(string token)
        {
            var key = Encoding.ASCII.GetBytes("muchosecrete.....");

            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = false,
                ValidateIssuer = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateLifetime = false,
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken securityToken;
            var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out securityToken);
            var jwtSecurityToken = securityToken as JwtSecurityToken;
            if (jwtSecurityToken == null || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
                throw new SecurityTokenException("Este es un token invalido");
            return principal;
        }

        public async Task<IResponseToken> AsignarTokenNuevo(TokenApi tokenApi)
        {
            string accesToken = tokenApi.AccessToken;
            string refreshToken = tokenApi.RefreshToken;
            var principal = GetPrincipleFromExpiredToken(accesToken);
            var username = principal.Identity.Name;
            var user = await _context.Usuario.FirstOrDefaultAsync(x => x.Username == username);
            if (user is null || user.RefreshToken != refreshToken || user.RefreshTokenExpiryTime <= DateTime.Now)
                return new IResponseToken
                {
                    Success = false,
                    HelperData = "",
                    Token = "",
                    RefreshToken = "",
                    Message = ""
                };

            var newAccesstoken = CreateJwtToken(user);
            var newrefreshToken = CreateRefreshToken();
            user.RefreshToken = newrefreshToken;
            await _context.SaveChangesAsync();
            return new IResponseToken
            {
                Success = true,
                HelperData = "Correcto",
                Token = newAccesstoken,
                RefreshToken = newrefreshToken,
                Message = "Acceso correcto"
            };

        }

        public async Task<ResponseHelper> ResetPassword(ResetPasswordDTO resetPasswordDTO)
        {
            try { 
            var newToken = resetPasswordDTO.EmailToken.Replace(" ", "+");
            var user = await _context.Usuario.AsNoTracking().FirstOrDefaultAsync(a => a.Correo == resetPasswordDTO.Email);
            if(user is null)
            {
                return new ResponseHelper { Success = false, Message = "No se envio el correo" };

            }
            var tokenCode = user.ResetPasswordToken;
            DateTime emailTokenExpiry = user.ResetPasswordExpiry;
            if(tokenCode != resetPasswordDTO.EmailToken || emailTokenExpiry < DateTime.Now)
            {
                return new ResponseHelper { Success = false, Message = "Surgio un problema" };
            }
            user.Password = PasswordHasher.HashPassword(resetPasswordDTO.NewPassword);
            _context.Entry(user).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return new ResponseHelper { Success = true, Message = "Surgio un problema" };
            }
            catch (Exception ex)
            {
                return new ResponseHelper { Success = false, Message = ex.Message };


            }
        }
    }
}
