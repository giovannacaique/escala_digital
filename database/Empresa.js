//Para criar um BD(tabela) sem entrar no MySQL
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
        type: Sequelize.STRING(12),
        allowNull: false,
    },
});
Empresa.sync({ force: false });

Empresa.beforeCreate(async (empresa) => {
    const salt = await bcrypt.genSalt(10);
    empresa.senha = await bcrypt.hash(empresa.senha, salt);
});

module.exports = Empresa;