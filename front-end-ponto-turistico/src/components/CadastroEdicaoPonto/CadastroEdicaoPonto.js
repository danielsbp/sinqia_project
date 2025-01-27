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
        errors: {},
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
      this.setState({ loading: true });
      try {
        const data = await this.service.getPontoTuristicoById(id);
        this.setState(data);
        this.setState({ loading: false });
      } catch (error) {
        console.error("Erro ao buscar ponto turístico", error);
        this.setState({ loading: false });
      }
    };
  
    handleChange = (e) => {
      this.setState({ [e.target.id]: e.target.value });
    };

    validate = () => {
      const { nome, descricao, localizacao, cidade, estado } = this.state;
      const errors = {};
      
      if (!nome) {
        errors.nome = "É necessário informar o nome do ponto turístico.";
      } else if (nome.length > 100) {
        errors.nome = "Foi ultrapassado o limite de caracteres do campo de nome. (máx. 100)";
      }

      if (!descricao) {
        errors.descricao = "É necessário informar a descrição do ponto turístico.";
      } else if (descricao.length > 100) {
        errors.descricao = "Foi ultrapassado o limite de caracteres do campo de descrição. (máx. 100)";
      }

      if (!localizacao) {
        errors.localizacao = "É necessário informar a localização.";
      } else if (localizacao.length > 150) {
        errors.localizacao = "Foi ultrapassado o limite de caracteres do campo de localização. (máx. 150)";
      }

      if (!cidade) {
        errors.cidade = "É necessário informar a cidade do ponto turístico.";
      } else if (cidade.length > 50) {
        errors.cidade = "Foi ultrapassado o limite de caracteres do campo de cidade. (máx. 50)";
      }

      if (!estado) {
        errors.estado = "É necessário informar o estado do ponto turístico.";
      } else if (estado.length !== 2) {
        errors.estado = "Use a sigla do estado. Por exemplo: SP.";
      }

      this.setState({ errors });

      return Object.keys(errors).length === 0;
    };

    handleSubmit = async (e) => {
      e.preventDefault();

      if (!this.validate()) {
        return; 
      }

      const { nome, descricao, localizacao, cidade, estado } = this.state;
      const { id } = this.props.params;
      const { navigate } = this.props;

      const pontoTuristicoData = { nome, descricao, localizacao, cidade, estado };

      try {
        this.setState({ loading: true });
        if (id) {
          await this.service.updatePontoTuristico(id, pontoTuristicoData);
          this.setState({ loading: false });

          toast("Ponto turístico atualizado com sucesso!");
        } else {
          await this.service.insertPontoTuristico(pontoTuristicoData);
          toast("Ponto turístico cadastrado com sucesso!");
          this.setState({ loading: false });
        }
      } catch (error) {
        this.setState({ loading: false });
        toast("Ocorreu um erro. Tente novamente mais tarde.");
      }
    };

    render() {
      const { nome, descricao, localizacao, cidade, estado, loading, errors } = this.state;
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
                    {errors.nome && <div className="text-danger">{errors.nome}</div>}
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
                    {errors.descricao && <div className="text-danger">{errors.descricao}</div>}
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col col-md-6">
                    <label htmlFor="localizacao" className="form-label">
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
                    {errors.localizacao && <div className="text-danger">{errors.localizacao}</div>}
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
                    {errors.estado && <div className="text-danger">{errors.estado}</div>}
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
                    {errors.cidade && <div className="text-danger">{errors.cidade}</div>}
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
