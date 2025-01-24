using APIPontoTuristico.Models;

namespace APIPontoTuristico.Repositories.Interfaces
{
    public interface IPontoTuristicoRepository
    {
        Task<List<PontoTuristicoModel>> GetAll();
        Task<List<PontoTuristicoModel>> GetByName(string nome);
        Task<List<PontoTuristicoModel>> GetByDescription(string nome);
        Task<PontoTuristicoModel> GetById(int id);
        Task<PontoTuristicoModel> Insert(PontoTuristicoModel pontosTuristico);
        Task<PontoTuristicoModel> Update(int id, PontoTuristicoModel pontoTuristico);
        Task<bool> Delete(int id);
    }
}
