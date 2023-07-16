using GoldenEleganceProyecto.Context;
using GoldenEleganceProyecto.Models;
using GoldenEleganceProyecto.Models.Helpers;
using GoldenEleganceProyecto.Service.IServices;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;
using System.Text;

namespace GoldenEleganceProyecto.Service.Services
{
    public class UsuariosServicio : IUsuariosServicio
    {

        private readonly ApplicationDbContext _context;
        private readonly ILogger _logger;

        public UsuariosServicio(ApplicationDbContext context, ILogger<Usuarios> logger)
        {
            _logger = logger;
            _context = context;

        }

        public async Task<ResponseHelper> CrearUsuario(Usuarios usuario)
        {
            ResponseHelper response = new ResponseHelper();
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
            catch (Exception error)
            {
                response.Success = false;
                response.Message = "El Usuario No se pudo crear!";
                _logger.LogError(error.Message);
            }
            return response;
        }

        public async Task<ResponseHelper> EditarUsuario(Usuarios vm)
        {
            ResponseHelper response = new ResponseHelper();
            try
            {
                if (vm == null)
                    return new ResponseHelper { Success = false, Message = "Necesitas rellenar los campos solicitados" };

                //Checar Username
                //if (await CheckUsernameExist(vm.Username))
                //    return new ResponseHelper { Success = false, Message = "Username ya esta en uso" };


                //Checar contraseña
                var checkpass = CheckPasswordStrength(vm.Password);

                if (!string.IsNullOrEmpty(checkpass))
                    return new ResponseHelper { Success = false, Message = checkpass.ToString() };

                Usuarios modeloUsuario = new Usuarios();
                modeloUsuario = await _context.Usuario.FindAsync(vm.PkUsuario);

                modeloUsuario.PkUsuario = vm.PkUsuario;
                modeloUsuario.Nombre = vm.Nombre;
                modeloUsuario.Username = vm.Username;
                modeloUsuario.Apellido = vm.Apellido;
                modeloUsuario.Correo = vm.Correo;
                modeloUsuario.Password = PasswordHasher.HashPassword(vm.Password);
                modeloUsuario.Telefono = vm.Telefono;
                modeloUsuario.Direccion = vm.Direccion;
                modeloUsuario.FKRol = vm.FKRol;
                modeloUsuario.IsDeleted = vm.IsDeleted;

                _context.Usuario.Update(modeloUsuario);
                await _context.SaveChangesAsync();

                response.Message = "Usuario Actualixada Perfectamente!";
                response.Success = true;
            }
            catch (Exception error)
            {
                response.Success = false;
                response.Message = "Eror AL Momento de crear al Usuario!";
                _logger.LogError(error.Message);
            }
            return response;
        }

        public async Task<ResponseHelper> EliminarUsuario(int? Id)
        {
            ResponseHelper response = new ResponseHelper();
            try
            {
                Usuarios modeloUsuario = new Usuarios();
                modeloUsuario = await _context.Usuario.FindAsync(Id);


                if (modeloUsuario == null || modeloUsuario.PkUsuario < 0)
                {
                    response.Success = false;
                    response.Message = "No se ha podido encontrar al usuario";
                }
                else
                {
                    modeloUsuario.IsDeleted = true;
                    _context.Usuario.Update(modeloUsuario);
                    _context.SaveChanges();
                    response.Success = true;
                    response.Message = "El Usuario Se ha Eliminado Perfectamente";
                }
            }
            catch (Exception error)
            {

                response.Success = false;
                response.Message = "No se ha podido ELiminar al Usuario!";
                _logger.LogError(error.Message);
            }
            return response;
        }

        public Task<bool> ExisteUsuario(Usuarios asignatura)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> ExisteUsuarioPorId(int? Id)
        {
            var usuarioEncontrado = false;
            try
            {
                Usuarios modeloUsuario = new Usuarios();

                modeloUsuario = await _context.Usuario.FindAsync(Id);

                if (modeloUsuario.PkUsuario != null && modeloUsuario.PkUsuario > 0)
                {
                    usuarioEncontrado = true;
                }
                else
                {
                    usuarioEncontrado = false;
                }
            }
            catch (Exception error)
            {
                _logger.LogError(error.Message);
            }
            return usuarioEncontrado;
        }

        public async Task<List<Usuarios>> ObtenerLista()
        {
            List<Usuarios> lista = new List<Usuarios>();
            try
            {
                lista = await _context.Usuario.Include(u => u.Roles).ToListAsync();

            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return lista;


        }

        public async Task<Usuarios> ObtenerPorId(int? Id)
        {
            Usuarios modeloUsuario = new Usuarios();

            try
            {
                modeloUsuario = await _context.Usuario.FindAsync(Id);

            }
            catch (Exception error)
            {
                _logger.LogError(error.Message);
            }
            return modeloUsuario;
        }
        public async Task<Usuarios> ObtenerPorUsername(string username)
        {
            Usuarios usuario = new Usuarios();

            try
            {
                 usuario = await _context.Usuario.Where(x => x.Username == username).FirstOrDefaultAsync();

            }
            catch (Exception error)
            {
                _logger.LogError(error.Message);
            }
            return usuario;
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

    }
}
