using GoldenEleganceProyecto.Context;
using GoldenEleganceProyecto.Models;
using GoldenEleganceProyecto.Models.Helpers;
using GoldenEleganceProyecto.Service.IServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GoldenEleganceProyecto.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthenticationController : ControllerBase
    {

        private readonly IAuthenticationServicio _authenticationServicio;
        private readonly IEmailService _emailService;

        public AuthenticationController(IAuthenticationServicio authenticationServicio, IEmailService emailService)
        {
            _authenticationServicio = authenticationServicio;
            _emailService = emailService;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login([FromBody] Usuarios usuario)
        {
            if (usuario == null)
                return BadRequest();

            var responseToken = await _authenticationServicio.LoginUsuario(usuario);
            if (responseToken.Success == false)
            {
                BadRequest(responseToken);
            }

            return Ok(responseToken);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [Route("Registro")]
        public async Task<IActionResult> SingUp([FromBody] Usuarios usuario)
        {
            if (usuario == null)
                return BadRequest();

            var responseHelper = await _authenticationServicio.RegistrarUsuario(usuario);


            if (responseHelper.Success == true)
            {
                var enviarEmail = await _emailService.SendEmailConfirmacionCorreo(usuario.Correo);
            }

            return Ok(responseHelper);
        }

        [HttpPost]
        [Route("RefreshToken")]
        public async Task<IActionResult> RefreshToken(TokenApi tokenApi)
        {
            if (tokenApi == null)
                return BadRequest("Solicitud invalida");

            var responseToken = await _authenticationServicio.AsignarTokenNuevo(tokenApi);
            if (responseToken.Success == false)
                return BadRequest(responseToken);

            return Ok(responseToken);
        }

        [HttpPost]
        [Route("send-reset-email/{email}")]
        public async Task<IActionResult> SendEmailPassword(string email)
        {
            var user = await _emailService.SendEmailResetPassword(email);
            if (user == null)
                return BadRequest();

            return Ok(user);

        }

        [HttpPost]
        [Route("reset-password")]
        public async Task<IActionResult> ResetPassword(ResetPasswordDTO resetPasswordDTO)
        {
            var user = await _authenticationServicio.ResetearPassword(resetPasswordDTO);
            if (user == null)
                return BadRequest();

            return Ok(user);
        }

        [HttpPost]
        [Route("confirmarCorreo")]
        public async Task<IActionResult> ConfirmarCorreo(ConfirmacionCorreoDTO confirmacionCorreo)
        {
            var user = await _authenticationServicio.ConfirmarEmail(confirmacionCorreo);
            if (user == null)
                return BadRequest();

            return Ok(user);
        }

    }
}
