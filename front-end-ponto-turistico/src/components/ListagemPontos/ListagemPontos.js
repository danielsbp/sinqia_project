import { Component } from "react";
import PontosTuristicosService from "../../services/PontosTuristicosService";
import { toast, ToastContainer } from "react-toastify";
import formatDate from "../../utils/formatDate";
import Loader from "../Loader/Loader";

class ListagemPontos extends Component {
    constructor(props) {
      super(props);

      this.state = {
        pontosTuristicos: [],
        searchTerm: "",
        loading: false,
      };
      this.service = new PontosTuristicosService();
    }

    
  
    componentDidMount() {
      this.fetchPontosTuristicos();
    }
  
    fetchPontosTuristicos = async () => {
      this.setState({ loading: true });
      try {
        const data = await this.service.getAllPontosTuristicos();
        this.setState({ pontosTuristicos: data, loading: false });
      } catch (error) {
        console.error("Erro ao buscar os pontos turísticos", error);
      }
    };

    handleSearch = async () => {
      const { searchTerm } = this.state;
      try {
        if (searchTerm.trim() === "") {
          this.fetchPontosTuristicos();
        } else {
          const data = await this.service.getPontoTuristicoByTerm(searchTerm);
          
          this.setState({ pontosTuristicos: data });

          let emptyData = data.length == 0; 
          if(emptyData) {
            toast("Não foi possível encontrar nada com este termo.");
          }
        }
      } catch (error) {
        console.error("Erro ao buscar pontos turísticos", error);
      }
    };

    handleChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
    };
  
    render() {
      const { pontosTuristicos, searchTerm } = this.state;
      const loading = this.state.loading;
      const navigate = this.props.navigate;
      
      return (
        
          <div>
            {loading && <Loader />}
            {!loading && (
            <div>
              <div className="input-group mb-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Pesquisar ponto turístico"
                  name="searchTerm"
                  value={searchTerm}
                  onChange={this.handleChange}
                />
                <button className="btn btn-outline-secondary" onClick={this.handleSearch}>
                  Pesquisar
                </button>

                <ToastContainer
                  position="bottom-center"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick={false}
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="dark"
                />

              </div>
              <div className="list-group">
                {pontosTuristicos.map((ponto) => (
                  <div
                    key={ponto.id}
                    className="list-group-item list-group-item-action"
                    onClick={() => navigate(`/editar/${ponto.id}`)}
                  >
                    <h5>{ponto.nome}</h5>
                    <p>{ponto.descricao}</p>
                    <small>Publicado em: {formatDate(ponto.criadoEm)}</small>
                  </div>
                ))}
              </div>
            </div>
            )}
          </div>
        
      );
    }
  }

export default ListagemPontos;