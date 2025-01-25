using APIPontoTuristico.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace APIPontoTuristico.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class PontoTuristicoController : ControllerBase
    {
        [HttpGet]
        public ActionResult<List<PontoTuristicoModel>> getPontoTuristico()
        {
            return Ok();
        }
    }
}
 