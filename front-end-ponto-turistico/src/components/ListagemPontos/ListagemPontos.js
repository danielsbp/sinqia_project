import { Component } from "react";
import PontosTuristicosService from "../../services/PontosTuristicosService";
import { toast, ToastContainer } from "react-toastify";
import formatDate from "../../utils/formatDate";
import Loader from "../Loader/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faArrowLeft, faArrowRight, faSearch, faTrash} from '@fortawesome/free-solid-svg-icons'

class ListagemPontos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pontosTuristicos: [],
      searchTerm: "",
      loading: false,
      currentPage: 1,
      itemsPerPage: 5,
      hoverId: null, 
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
        if (emptyData) {
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

  paginate = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
  };

  handleMouseEnter = (id) => {
    this.setState({ hoverId: id });
  };

  handleMouseLeave = () => {
    this.setState({ hoverId: null });
  };

  handleDelete = async (id) => {
    const { pontosTuristicos } = this.state;
    try {
      const deletedData = await this.service.deletePontoTuristico(id);
      this.setState({
        pontosTuristicos: pontosTuristicos.filter((ponto) => ponto.id !== id),
      });
      toast("Ponto turístico excluído com sucesso.");
    } catch (error) {
      console.error("Erro ao excluir ponto turístico", error);
      toast.error("Erro ao excluir ponto turístico.");
    }
  };

  render() {
    const { pontosTuristicos, searchTerm, loading, currentPage, itemsPerPage, hoverId } = this.state;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = pontosTuristicos.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(pontosTuristicos.length / itemsPerPage);

    const navigate = this.props.navigate;

    return (
      <div>
        {loading && <Loader />}
        {!loading && (
          <div>
            <h2>Pontos Turísticos</h2>
            <div className="input-group mb-4">
              <input
                type="text"
                className="form-control"
                placeholder="Busque por localização, nome ou descrição."
                name="searchTerm"
                value={searchTerm}
                onChange={this.handleChange}
              />
              
              <button className="btn btn-outline-secondary" onClick={this.handleSearch}>
                <FontAwesomeIcon icon={faSearch} /> Pesquisar
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
              {currentItems.map((ponto) => (
                <div
                  key={ponto.id}
                  className="list-group-item list-group-item-action"
                  onClick={() => navigate(`/editar/${ponto.id}`)}
                  onMouseEnter={() => this.handleMouseEnter(ponto.id)} 
                  onMouseLeave={this.handleMouseLeave} 
                >
                  <h5>{ponto.nome}</h5>
                  <p>{ponto.descricao}</p>
                  <p>{ponto.localizacao}, {ponto.cidade} - {ponto.estado}</p>
                  <small>Publicado em: {formatDate(ponto.criadoEm)}</small>
                  
                  {/* Botão de exclusão (visível apenas ao passar o mouse) */}
                  {hoverId === ponto.id && (
                    <button
                      className="btn btn-danger btn-sm float-end"
                      onClick={(e) => {
                        e.stopPropagation();
                        this.handleDelete(ponto.id);
                      }}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Paginação */}
            {totalPages > 1 && (
              <nav className="mt-3">
                <ul className="pagination justify-content-center">
                  <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                    <button className="page-link" onClick={() => this.paginate(currentPage - 1)}
                      style={{ borderTopLeftRadius: "100px", borderBottomLeftRadius: "100px" }}>
                      <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
                  </li>
                  {[...Array(totalPages)].map((_, index) => (
                    <li
                      key={index}
                      className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
                    >
                      <button className="page-link" onClick={() => this.paginate(index + 1)}>
                        {index + 1}
                      </button>
                    </li>
                  ))}
                  <li
                    className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
                  >
                    <button className="page-link" onClick={() => this.paginate(currentPage + 1)} 
                    style={{ borderTopRightRadius: "100px", borderBottomRightRadius: "100px" }}>
                    <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                  </li>
                </ul>
              </nav>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default ListagemPontos;
