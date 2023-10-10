const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const connection = require("./database/database");
const bcrypt = require('bcrypt');

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

/*Metodo post
app.post("/cadastro/funcionario", (req, res) => {
    const { nome_fun, func_status, turno, cpf, rg, cart_trabalho, data_admissao, car_horaria, sexo, nome_empresa, setor, descricao } = req.body;
    Funcionario.create({
        nome_fun: nome_fun,
        func_status: func_status,
        turno: turno,
        cpf: cpf,
        rg: rg,
        cart_trabalho: cart_trabalho,
        data_admissao: data_admissao,
        car_horaria: car_horaria,
        sexo: sexo,
        nome_empresa: nome_empresa,
        setor: setor,
        descricao: descricao
    })
        .then(() => {
            const successMessage = 'Funcionário cadastrado com sucesso!';
            console.log(successMessage);
            res.status(201).json({ message: successMessage, success: true });
        })
        .catch((err) => {
            const errorMessage = 'Erro ao cadastrar funcionário: ' + err.message;
            console.error(errorMessage);
            res.status(500).json({ error: errorMessage, success: false });
        });
});*/


//Autenticação LOGIN
app.post('/login', async (req, res) => {
    const { email, senha } = req.body;
    
    try {
        // Procura por um registro no banco de dados com o email fornecido
        const empresa = await Empresa.findOne({ where: { email } });

        if (!empresa) {
            return res.status(400).json({ mensagem: 'Email ou Senha incorreto' });
        }

        // Compara a senha fornecida com a senha armazenada no registro
        const senhaValida = await bcrypt.compare(senha, empresa.senha);

        if (!senhaValida) {
            return res.status(400).json({ mensagem: 'Email ou Senha incorreto' });
        }

        // Se chegou até aqui, a autenticação foi bem-sucedida
        res.json({ mensagem: 'Login bem-sucedido' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
});


//ROTA
app.listen(8080, () => {
    console.log("Está rodando na porta ${port}");
});