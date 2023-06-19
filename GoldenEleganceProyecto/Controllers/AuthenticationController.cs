using GoldenEleganceProyecto.Models;
using GoldenEleganceProyecto.Models.Helpers;
using GoldenEleganceProyecto.Service.IServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GoldenEleganceProyecto.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthenticationController : ControllerBase
    {

        private readonly IAuthenticationServicio _authenticationServicio;

        public AuthenticationController(IAuthenticationServicio authenticationServicio)
        {
            _authenticationServicio = authenticationServicio;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login([FromBody] Usuarios usuario)
        {
            if(usuario == null)
                return BadRequest();

            var responseToken = await _authenticationServicio.LoginUsuario(usuario);
            if(responseToken.Success == false)
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

            return Ok(responseHelper);
        }

        [HttpPost]
        [Route("RefreshToken")]
        public async Task<IActionResult> SingUp(TokenApi tokenApi)
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
            var user = await _authenticationServicio.ResetPasswor2(email);
            if (user == null)
                return BadRequest();

            return Ok(user);

        }
        [HttpPost]
        [Route("reset-password")]
        public async Task<IActionResult> ResetPassword( ResetPasswordDTO resetPasswordDTO)
        {
            var user = await _authenticationServicio.ResetPassword(resetPasswordDTO);
                 if (user == null)
                return BadRequest();

            return Ok(user);
        }
    }
}
