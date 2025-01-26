using APIPontoTuristico.Models;

namespace APIPontoTuristico.Repositories.Interfaces
{
    public interface IPontoTuristicoRepository
    {
        Task<List<PontoTuristicoModel>> GetAll();
        Task<List<PontoTuristicoModel>> GetByTerm(string term);
        Task<PontoTuristicoModel> GetById(int id);
        Task<PontoTuristicoModel> Insert(PontoTuristicoModel pontosTuristico);
        Task<PontoTuristicoModel> Update(int id, PontoTuristicoModel pontoTuristico);
        Task<bool> Delete(int id);
    }
}
