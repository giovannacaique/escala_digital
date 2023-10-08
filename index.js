//localhost:8080
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const connection = require("./database/database");

//Para conectar com o BD criado
const Empresa = require("./database/Empresa");

connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com o banco de dados");
    })
    .catch((msgErro) => {
        console.log(msgErro);
    });

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

//Estou dizendo para o Express usar o EJS como view engine
app.set('view engine', 'ejs');

//Estou definindo a pasta de arquivos estaticos
app.use(express.static('public'));

app.get("/", (req, res) => {
    res.render('index');
});

app.get("/login", (req, res) => {
    res.render('login');
});

app.get("/cadastro/empresa", (req, res) => {
    res.render('empresa');
});

//Metodo post
app.post("/cadastro/empresa", (req, res) => {
    const { nome_empresa, cnpj_cpf, razao_social, quantidade_funcionarios, email, senha } = req.body;
    Empresa.create({
        nome_empresa: nome_empresa,
        cnpj_cpf: cnpj_cpf,
        razao_social: razao_social,
        quantidade_funcionarios: quantidade_funcionarios,
        email: email,
        senha: senha
    })
        .then(() => {
            const successMessage = 'Empresa cadastrada com sucesso! Agora cadastre os funcionários.';
            console.log(successMessage);
            res.status(201).json({ message: successMessage, success: true });
        })
        .catch((err) => {
            const errorMessage = 'Erro ao cadastrar empresa: ' + err.message;
            console.error(errorMessage);
            res.status(500).json({ error: errorMessage, success: false });
        });
});



app.get("/cadastro/funcionario", (req, res) => {
    res.render('funcionario');
});

app.listen(8080, () => {
    console.log("Está rodando na porta ${port}");
});