import api from "./api";

class PontosTuristicosService {

    getPontoTuristicoById = async (id) => {
        const response = await api.get(`/ponto_turistico/${id}`);
        return response.data;
    };
    getAllPontosTuristicos = async () => {
        const response = await api.get("/ponto_turistico");
        return response.data;
    };
    
    getPontoTuristicoByTerm = async (term) => {
        const response = await api.get(`/ponto_turistico/search/${term}`);
        return response.data;
    };
    
    insertPontoTuristico = async (pontoTuristicoData) => {
        const response = await api.post(`/ponto_turistico`, pontoTuristicoData);
        return response.data;
    };
    
    updatePontoTuristico = async (id, pontoTuristicoData) => {
        const response = await api.put(`/ponto_turistico/${id}`, pontoTuristicoData);
        return response.data;
    };
    
    deletePontoTuristico = async (id, pontoTuristicoData) => {
        const response = await api.delete(`/ponto_turistico/${id}`, pontoTuristicoData);
        return response.data;
    };
}

export default PontosTuristicosService;