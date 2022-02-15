const database = require('../database/connection');
const utils = require('../utils/utils')

module.exports = {
    create(request, response){
        const  {nome, sobrenome, idade, login, senha, status, endereços} = request.body;
        database.insert({NOME:nome, SOBRENOME: sobrenome, IDADE: idade, LOGIN: login, SENHA: senha, STATUS:status}).table("tb_pessoa").then(_pessoa => {
            database.select("*").table("tb_pessoa").then(persons => {
                endereços.forEach(endereco =>{
                    database.insert({CODIGO_PESSOA: persons[persons.length-1].CODIGO_PESSOA, CODIGO_BAIRRO: endereco.codigoBairro, NOME_RUA: endereco.nomeRua, NUMERO: endereco.numero, COMPLEMENTO: endereco.complemento, CEP: endereco.cep}).table("tb_endereço").then(_endereco => {
                        utils.retrieveData(response, 'tb_pessoa')
                    }).catch(error => {
                        console.log(error)
                    })
                })
            })
        })
        .catch(error =>{
            console.log(error)
        })
    },

    read(request, response){
        const { codigoPessoa } = request.query; 

        if(codigoPessoa){
            database("tb_pessoa as p").join("tb_endereço as e", "e.CODIGO_PESSOA", "p.CODIGO_PESSOA").select("").where({"p.CODIGO_PESSOA": codigoPessoa}).then(result =>{
                console.log(result)
                let temp;
                const object = {
                    codigoPessoa: result[0].CODIGO_PESSOA,
                    nome: result[0].NOME,
                    sobrenome: result[0].SOBRENOME,
                    idade: result[0].IDADE,
                    login: result[0].LOGIN,
                    senha: result[0].SENHA,
                    status: result[0].STATUS,
                    enderecos: []
                }
                result.forEach(register =>{
                    temp = {
                        codigoEndereco: register.CODIGO_ENDERECO,
                        codigoBairro: register.CODIGO_BAIRRO,
                        nomeRua: register.NOME_RUA,
                        numero: register.NUMERO,
                        complemento: register.COMPLEMENTO,
                        cep: register.CEP
                    }

                    object.enderecos.push(temp)
                })
                response.json(object)
            })
        }

        else{
            database.select("*").table("tb_pessoa").then(pessoas => {
                utils.retrieveData(response, 'tb_pessoa')
            })
            .catch((error) =>{
                console.log(error)
            })
        }
    },
    
    update(request, response){
        const {codigoPessoa, nome, sobrenome, idade, login, senha, status, endereços} = request.body;
        database.where({CODIGO_PESSOA: codigoPessoa}).update({NOME: nome, SOBRENOME: sobrenome, IDADE: idade, LOGIN: login,  SENHA: senha, STATUS: status}).table("tb_pessoa").then(_pessoa => {
            database.select("*").table("tb_pessoa").then(persons => {
                endereços.forEach(endereco =>{
                    database.where({CODIGO_ENDERECO: endereco.codigoEndereco}).update({CODIGO_PESSOA: persons[persons.length-1].CODIGO_PESSOA, CODIGO_BAIRRO: endereco.codigoBairro, NOME_RUA: endereco.nomeRua, NUMERO: endereco.numero, COMPLEMENTO: endereco.complemento, CEP: endereco.cep}).table("tb_endereço").then(_endereco => {
                        utils.retrieveData(response, 'tb_pessoa')
                    }).catch((error) =>{
                        console.log(error)
                    })
                })
            })
        }).catch((error) =>{
            console.log(error)
        })
    },

    delete(request, response){
        const {CODIGO_PESSOA} = request.body;

        database.where({CODIGO_PESSOA: CODIGO_PESSOA}).del().table("tb_pessoa").then(_pessoa => {
            utils.retrieveData(response, 'tb_pessoa')
        }).catch((error) =>{
            console.log(error)
        })
    },
}