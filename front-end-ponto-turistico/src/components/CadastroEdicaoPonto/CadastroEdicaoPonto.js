import { Component } from "react";
import PontosTuristicosService from "../../services/PontosTuristicosService";
import Loader from "../Loader/Loader";
import { toast, ToastContainer } from "react-toastify";

class CadastroEdicaoPonto extends Component {
    constructor(props) {
      super(props);
      this.state = {
        nome: "",
        descricao: "",
        localizacao: "",
        cidade: "",
        estado: "",
        id: "",
        loading: false,
      };
      this.service = new PontosTuristicosService();
    }
  
    componentDidMount() {
      const { id } = this.props.params;
      if (id) {
        this.fetchPontoTuristico(id);
      }
    }
  
    fetchPontoTuristico = async (id) => {
      this.setState({"loading": true});
      try {
        const data = await this.service.getPontoTuristicoById(id);
        this.setState(data);
        this.setState({"loading": false});
      } catch (error) {
        console.error("Erro ao buscar ponto turístico", error);
        this.setState({"loading": false});
      }
    };
  
    handleChange = (e) => {
      this.setState({ [e.target.id]: e.target.value });
    };
  
    handleSubmit = async (e) => {
      e.preventDefault();
      const { nome, descricao, localizacao, cidade, estado, } = this.state;
      const { id } = this.props.params;
      const { navigate } = this.props;
  
      const pontoTuristicoData = { nome, descricao, localizacao, cidade, estado, };
  
      try {
        this.setState({"loading": true});
        if (id) {
          
          await this.service.updatePontoTuristico(id, pontoTuristicoData);
          this.setState({"loading": false});

          toast("Ponto turístico atualizado com sucesso!");
          
        } else {
          await this.service.insertPontoTuristico(pontoTuristicoData);
          toast("Ponto turístico cadastrado com sucesso!");
          this.setState({"loading": false});
        }

      } catch (error) {
        this.setState({"loading": false});
        toast("Ocorreu um erro. Tente novamente mais tarde.");
      }
    };
  
    render() {
      const { nome, descricao, localizacao, cidade, estado, loading } = this.state;
      const { id } = this.props.params;
      const navigate = this.props.navigate;

      
  
      return (
        
        <div>
          {loading && <Loader />}
          {!loading && (
          <div>  
          
          <h1>{id ? "Editar Ponto Turístico" : "Cadastrar Ponto Turístico"}</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="row mb-3">
              <div className="col">
                <label htmlFor="nome" className="form-label">
                  Nome
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nome"
                  value={nome}
                  onChange={this.handleChange}
                  required
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col">
                <label htmlFor="descricao" className="form-label">
                  Descrição
                </label>
                <textarea
                  className="form-control"
                  id="descricao"
                  value={descricao}
                  onChange={this.handleChange}
                  rows="3"
                  required
                ></textarea>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col col-md-6">
                <label htmlFor="nome" className="form-label">
                  Localização
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="localizacao"
                  value={localizacao}
                  onChange={this.handleChange}
                  required
                />
              </div>

              <div className="col col-md-3">
                <label htmlFor="estado" className="form-label">
                  Estado
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="estado"
                  value={estado}
                  onChange={this.handleChange}
                  required
                />
              </div>

              <div className="col col-md-3">
                <label htmlFor="cidade" className="form-label">
                  Cidade
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="cidade"
                  value={cidade}
                  onChange={this.handleChange}
                  required
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              {id ? "Salvar" : "Cadastrar"}
            </button>
            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={() => navigate("/")}
            >
              Voltar
            </button>
          </form>


          </div>
          )}
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
      );
    }
  }

export default CadastroEdicaoPonto;