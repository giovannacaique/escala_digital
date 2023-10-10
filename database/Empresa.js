//Para criar um BD(tabela) sem entrar no MySQL
const bcrypt = require('bcrypt');
const Sequelize = require("sequelize");
const connection = require("./database");

const Empresa = connection.define('empresa', {
    id_empresa: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    nome_empresa: {
        type: Sequelize.STRING(40),
        allowNull: false,
    },
    cnpj_cpf: {
        type: Sequelize.BIGINT.UNSIGNED,
        unique: true,
        allowNull: false,
    },
    razao_social: {
        type: Sequelize.STRING(50),
    },
    quantidade_funcionarios: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING(50),
        allowNull: false,
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});
Empresa.sync({ force: false });

Empresa.beforeCreate(async (usuario) => {
    const salt = await bcrypt.genSalt(10);
    usuario.senha = await bcrypt.hash(usuario.senha, salt);
});

Empresa.sync()
    .then(() => {
        console.log('Tabela criada com sucesso!');
    })
    .catch((error) => {
        console.error('Erro ao criar tabela:', error);
    });


module.exports = Empresa;