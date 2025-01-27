## CRUD de Pontos Turísticos

### Tecnologias

- React
- C# (ASP.NET)
- SQL Server
- HTML, CSS, JS
- Bootstrap


### Tutorial para rodar o projeto

Primeiramente, clone o projeto no seu computador

```bash
git clone https://github.com/danielsbp/sinqia_project
```

### Back-end
#### Requisito:
Este projeto foi feito com .NET 6.0.301

#### Passo a Passo
- Abra o terminal na raiz do projeto e vá para a pasta APIPontoTuristico
```
cd APIPontoTuristico
```
- No arquivo global.json, coloque a versão exata do seu SDK do .NET 6
```
{
    "sdk": {
        "version": "6.0.428"
    }
}
```
- Instale as dependências do projeto rodando o comando:
```
dotnet restore
```
- Procure pelo arquivo appsettings.json e troque a propriedade "DataBase" da propriedade "ConnectionStrings" de acordo com as suas credênciais do seu servidor de banco de dados:

Exemplo de ConnectionStrings:
```
"ConnectionStrings": {
    "DataBase": "Server=./;Database=PontoTuristico;User Id=usuario;Password=1234"
}
```
- Rode a aplicação com o comando:
```
dotnet run
```
Pronto. Feito isso, a API estará rodando normalmente

### Front-end
#### Requisitos
Este projeto foi criado pelo NPX. A versão do NPM é 10.8.2

#### Passo a Passo
Verifique se está na pasta raiz do projeto e rode os seguintes comandos

```
cd .\front-end-ponto-turistico\
```
```
npm install
```
O projeto está pronto para ser executado! Rode o comando:
```
npm start
```
Seguindo todas essas etapas até aqui, o projeto está pronto para uso.
