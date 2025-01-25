﻿using APIPontoTuristico.Data;
using APIPontoTuristico.Models;
using APIPontoTuristico.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace APIPontoTuristico.Repositories
{
    public class PontoTuristicoRepository : IPontoTuristicoRepository
    {
        private const bool V = true;
        private readonly PontoTuristicoDBContext _dbContext;
        public PontoTuristicoRepository(PontoTuristicoDBContext pontoTuristicoDBContext)
        {
            _dbContext = pontoTuristicoDBContext;
        }
        public async Task<PontoTuristicoModel> GetById(int id)
        {
            return await _dbContext.PontosTuristicos.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<List<PontoTuristicoModel>> GetAll()
        {
            return await _dbContext.PontosTuristicos.ToListAsync();
        }

        public async Task<List<PontoTuristicoModel>> GetByDescription(string description)
        {
            return await _dbContext.PontosTuristicos.Where(x => EF.Functions.Like(x.Descricao, $"%{description}%"))
            .ToListAsync();
        }

        public async Task<List<PontoTuristicoModel>> GetByName(string name)
        {
            return await _dbContext.PontosTuristicos.Where(x => EF.Functions.Like((string)x.Nome, $"%{name}%"))
            .ToListAsync();
        }

        public async Task<PontoTuristicoModel> Insert(PontoTuristicoModel pontosTuristico)
        {
            await _dbContext.PontosTuristicos.AddAsync(pontosTuristico);
            await _dbContext.SaveChangesAsync();

            return pontosTuristico;
        }

        public async Task<PontoTuristicoModel> Update(int id, PontoTuristicoModel pontoTuristico)
        {
            PontoTuristicoModel pontoTuristicoById = await GetById(id);

            if(pontoTuristicoById == null)
            {
                throw new Exception("Não foi encontrado o ponto turístico para atualizar. ID:" + id);
            }

            pontoTuristicoById.Nome = pontoTuristico.Nome;
            pontoTuristicoById.Descricao = pontoTuristico.Descricao;
            pontoTuristicoById.Cidade = pontoTuristico.Cidade;
            pontoTuristicoById.Estado = pontoTuristico.Estado;
            pontoTuristicoById.Localizacao = pontoTuristico.Localizacao;
            pontoTuristicoById.CriadoEm = pontoTuristico.CriadoEm;

            _dbContext.PontosTuristicos.Update(pontoTuristicoById);
            await _dbContext.SaveChangesAsync();

            return pontoTuristicoById;

        }
        async public Task<bool> Delete(int id)
        {
            PontoTuristicoModel pontoTuristicoById = await GetById(id);

            if (pontoTuristicoById == null)
            {
                throw new Exception("Não foi encontrado o ponto turístico para remover. ID:" + id);
            }

            
            _dbContext.PontosTuristicos.Remove(pontoTuristicoById);
            await _dbContext.SaveChangesAsync();

            return true;
        }

    }
}
