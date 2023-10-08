//Para criar um BD(tabela) sem entrar no MySQL
const Sequelize = require("sequelize");
const connection = require("./database");

const Funcionario = connection.define('funcionario', {
    cod_func: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    nome_fun: {
        type: Sequelize.STRING(50),
        allowNull: false,
    },
    func_status: {
        type: Sequelize.TINYINT,
        allowNull: false,
    },
    turno: {
        type: Sequelize.STRING(5),
        allowNull: false,
    },
    cpf: {
        type: Sequelize.BIGINT.UNSIGNED,
        unique: true,
        allowNull: false,
    },
    rg: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    cart_trabalho: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    data_admissao: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    car_horaria: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    sexo: {
        type: Sequelize.STRING(10),
    },
    nome_empresa: {
        type: Sequelize.STRING(40),
        allowNull: false,
    },
    setor: {
        type: Sequelize.STRING(30),
    },
    descricao: {
        type: Sequelize.STRING(30),
    },
});
Funcionario.belongsTo(Empresa, { foreignKey: 'nome_empresa', targetKey: 'nome_empresa' });

Funcionario.sync({ force: false });
module.exports = Funcionario;
