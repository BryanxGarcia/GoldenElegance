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

        public Task<ResponseHelper> LoginUsuario(Usuarios usuario)
        {
            throw new NotImplementedException();
        }

        public Task<ResponseHelper> LogoutUsuario(bool isLogout)
        {
            throw new NotImplementedException();
        }

        public Task<Usuarios> ObtenerUsuario(int? Id)
        {
            throw new NotImplementedException();
        }

        public Task<ResponseHelper> RegistrarUsuario(Usuarios usuario)
        {
            throw new NotImplementedException();
        }

        public Task<ResponseHelper> ResetPassword(string correo)
        {
            throw new NotImplementedException();
        }
    }
}
