using GoldenEleganceProyecto.Models.Helpers;
using GoldenEleganceProyecto.Service.IServices;
using Microsoft.AspNetCore.Mvc;

namespace GoldenEleganceProyecto.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmailController : ControllerBase
    {

        private readonly IEmailService _emailService;

        public EmailController(IEmailService emailService)
        {
            _emailService = emailService;
        }

        //ryvbgumgqigdjogr

        /// <summary>
        /// 
        /// </summary>
        /// <param name="request"></param>
        /// <returns>ResponseHelper</returns>
        [HttpPost]
        [Route("SendEmailContacto")]
        public async Task<IActionResult> SendEmailContact(EmailDTO request)
        {
            ResponseHelper response = new  ResponseHelper();

             response =await _emailService.SendEmail(request);

            return Ok(response);
        }

    }
}
