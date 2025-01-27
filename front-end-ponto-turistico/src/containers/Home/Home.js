import React, { Component } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from "react-router-dom";

import ListagemPontos from "../../components/ListagemPontos/ListagemPontos";
import CadastroEdicaoPonto from "../../components/CadastroEdicaoPonto/CadastroEdicaoPonto";


function withRouter(Component) {
  return (props) => {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}

const ListagemPontosWithRouter = withRouter(ListagemPontos);


const CadastroEdicaoPontoWithRouter = withRouter((props) => {
  const params = useParams();
  return <CadastroEdicaoPonto {...props} params={params} />;
});

class App extends Component {
  

  render() {
    
    
    return (
      <div className="container mt-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="logo">Pontos Turísticos</h1>
            <button
              className="btn btn-primary"
              onClick={() => { document.location.href="/cadastro"; }}
            >
              {"Cadastrar Ponto Turístico"}
              
            </button>
          </div>
        <Router>
          <Routes>
            <Route path="/" element={<ListagemPontosWithRouter />} />
            <Route path="/cadastro" element={<CadastroEdicaoPontoWithRouter />} />
            <Route path="/editar/:id" element={<CadastroEdicaoPontoWithRouter />} />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
