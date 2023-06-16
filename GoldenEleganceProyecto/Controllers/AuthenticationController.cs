using GoldenEleganceProyecto.Models;
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


        //ryvbgumgqigdjogr

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
    }
}
