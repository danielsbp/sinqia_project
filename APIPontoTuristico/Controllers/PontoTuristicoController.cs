using APIPontoTuristico.Models;
using APIPontoTuristico.Repositories.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace APIPontoTuristico.Controller
{
    [Route("api/ponto_turistico")]
    [ApiController]
    public class PontoTuristicoController : ControllerBase
    {
        private readonly IPontoTuristicoRepository _pontoTuristicoReposity;

        public PontoTuristicoController(IPontoTuristicoRepository pontoTuristicoReposity)
        {
            this._pontoTuristicoReposity = pontoTuristicoReposity;
        }

        [HttpGet]
        public async Task<ActionResult<List<PontoTuristicoModel>>> getAllPontosTuristicos()
        {
            List<PontoTuristicoModel> pontosTuristicos = await _pontoTuristicoReposity.GetAll();
            List<PontoTuristicoModel> pontosTuristicosOrdenados = pontosTuristicos.OrderByDescending(p => p.CriadoEm).ToList();

            return Ok(pontosTuristicosOrdenados);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PontoTuristicoModel>> getPontoTuristicoById(int id)
        {
            PontoTuristicoModel pontoTuristico = await _pontoTuristicoReposity.GetById(id);

            return Ok(pontoTuristico);
        }

        [HttpGet("search/{term}")]
        public async Task<ActionResult<PontoTuristicoModel>> getPontoTuristicoByTerm(string term)
        {
            List<PontoTuristicoModel> pontosTuristicos = await _pontoTuristicoReposity.GetByTerm(term);
            List<PontoTuristicoModel> pontosTuristicosOrdenados = pontosTuristicos.OrderByDescending(p => p.CriadoEm).ToList();
            return Ok(pontosTuristicosOrdenados);
        }



        [HttpPost]
        public async Task<ActionResult<PontoTuristicoModel>> Insert([FromBody] PontoTuristicoModel pontoTuristicoModel) 
        {
            try {

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                pontoTuristicoModel.CriadoEm = DateTime.Now;

                PontoTuristicoModel pontoTuristico = await _pontoTuristicoReposity.Insert(pontoTuristicoModel);
                return Ok(pontoTuristico);
            }
            catch(Exception e)
            {
                return StatusCode(500, "Não foi possível adicionar ponto turístico.");
            }
            
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<PontoTuristicoModel>> Update([FromBody] PontoTuristicoModel pontoTuristicoModel, int id)
        {
            try
            {
                pontoTuristicoModel.Id = id;

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                PontoTuristicoModel pontoTuristico = await _pontoTuristicoReposity.Update(id, pontoTuristicoModel);
                return Ok(pontoTuristico);
            }
            catch(Exception e)
            {
                return StatusCode(500, "Não foi possível editar ponto turístico.");
            }

        }

        [HttpDelete("{id}")]
        public async Task<bool> Delete(int id)
        {

            bool deleted = await _pontoTuristicoReposity.Delete(id);
            return deleted;
            
            
        }

    }
}
 