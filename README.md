# Lead Manager App

Aplicação para gerenciamento de Leads com frontend em **React** e backend em **ASP.NET Core**.

## **Pré-requisitos**

Antes de rodar o projeto, você precisará ter instalado:

- [Node.js](https://nodejs.org/) (para o frontend)
- [Visual Studio 2022 ou superior](https://visualstudio.microsoft.com/) (para o backend .NET 7)
- [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) ou [Azure SQL](https://azure.microsoft.com/services/sql-database/)
- [Git](https://git-scm.com/)

## **Clonando o repositório**

```bash
git clone https://github.com/SEU_USUARIO/NOME_DO_REPOSITORIO.git
cd NOME_DO_REPOSITORIO
```

## **Principais Instruções**

1.0 - Crie um arquivo .env na raiz da pasta frontend com a variável do backend: REACT_APP_API_URL=http://localhost:5000 (sua porta do backend/api)

2.0 - Instale as dependências do front com: cd frontend -> npm install -> npm start (O frontend será aberto em http://localhost:3000)

3.0 - Criar uma tabela em um banco SQL;
3.1 - No appsettings.json do backend colar sua string de conexão com o banco;
3.2 - Criar a tabela com o script:
CREATE TABLE Leads (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    FirstName NVARCHAR(100) NOT NULL,
    FullName NVARCHAR(200),
    DateCreated DATETIME NOT NULL DEFAULT GETDATE(),
    Suburb NVARCHAR(100),
    Category NVARCHAR(100),
    Description NVARCHAR(MAX),
    Price DECIMAL(10,2),
    Status NVARCHAR(50) DEFAULT 'Invited',
    PhoneNumber NVARCHAR(20),
    Email NVARCHAR(100)
);

## **Executar Aplicação**
1 - Abra um terminal na pasta raiz e vá até a Api: cd/backend/src/Leads.Api
2 - Execute: dotnet run
3 - Verifique a porta local, copie e cole-a no browser, por fim, adicione ao final da url /swagger

4 - Abra outro terminal (deixe o da api rodando) e vá até Frontend: cd/frontend
5 - Execute: npm start
6 - O navegador deverá abrir automaticamente, se não, cole a url fornecida no browser

## **Testar Aplicação**
Infelizmente não foi criado uma formulário para criação de Leads, portanto recomendo o uso do Swagger para teste e visualização da api. Ao criar uma nova Lead, recomendo apagar os campos do json: Data, Status e Id. Pois são valores obtidos automaticamente e no caso de Status, iniciado com Default.
Em um cenário de Formulário seria possível fazer este contorno bloqueando campos ou pegando-os "por de baixo dos panos" sem que o usuário pudesse ver.

Em seguida, ao gerar ao menos uma Lead a aplicação deverá corresponder como esperado, listando-as com Status Invited e Accepted. 
