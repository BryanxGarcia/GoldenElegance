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

namespace GoldenEleganceProyecto.Service.Services
{
    public class AuthenticationServicio : IAuthenticationServicio
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<Usuarios> _logger;
        public AuthenticationServicio(ApplicationDbContext context, ILogger<Usuarios> logger)
        {
            _logger = logger;
            _context = context;

        }

        public async Task<ResponseHelper> LoginUsuario(Usuarios usuario)
        {

            if (usuario == null)
                return new ResponseHelper { Success = false, HelperData = "No se encontro el usuario", Message = "El usuario no pudo ser encontrado" };


            var user = await _context.Usuario.FirstOrDefaultAsync(x => x.Correo == usuario.Correo);

            if (user == null)
                return new ResponseHelper { Success = false, HelperData = "No se encontro el usuario revise el correo o contraseña", Message = "El usuario no pudo ser encontrado" };

            if (!PasswordHasher.VerifyPassword(usuario.Password, user.Password))
            {
                return new ResponseHelper
                {
                    Success = false,
                    HelperData = "No se encontro el usuario revise el correo o contraseña",
                    Message = "El usuario no pudo ser encontrado",
                };
            }

            user.Token = CreateJwtToken(user);

            return new ResponseHelper
            {
                Success = true,
                HelperData = user.Token,
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


                usuario.FKRol = 4;
                usuario.RowVersion = DateTime.Now;
                usuario.EmailConfirmed = false;
                usuario.IsDeleted = false;
                usuario.Token = "vacio";
                usuario.Password = PasswordHasher.HashPassword(usuario.Password);

                var resp = await _context.Usuario.AddAsync(usuario);
                var respu = await _context.SaveChangesAsync();
                if (resp == null && respu > 0)
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

        public Task<ResponseHelper> ResetPassword(string correo)
        {
            throw new NotImplementedException();
        }

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
    }
}
