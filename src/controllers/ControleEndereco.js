const database = require ('../database/connection.js')
const utils = require('../utils/utils')

module.exports = {
    create(request, response){
        const {codigoEndereco, codigoPessoa, codigoBairro, nomeRua, numero, complemento, cep} = request.body;
        database.insert({CODIGO_ENDERECO: codigoEndereco, CODIGO_PESSOA: codigoPessoa, CODIGO_BAIRRO: codigoBairro, NOME_RUA: nomeRua, NUMERO: numero, COMPLEMENTO: complemento, CEP: cep}).table("tb_endereço").then(_endereco => {
            response.status(201)
            utils.retrieveData(response, 'tb_endereço')
        }).catch(error => {
            console.log(error)
        })
    },

    read(request, response){
        database.select("*").table("tb_endereço").then(endereco => {
            let temp;
            const object = [];
            endereco.forEach(endereco =>{
                temp ={
                    codigoEndereco: endereco.CODIGO_ENDERECO,
                    codigoPessoa: endereco.CODIGO_PESSOA,
                    codigoBairro: endereco.CODIGO_BAIRRO,
                    nome: endereco.NOME_RUA,
                    numero: endereco.NUMERO,
                    complemento: endereco.COMPLEMENTO,
                    cep: endereco.CEP
                }
                object.push(temp)
            })
            response.json(object)
        }).catch((error) => {
            console.log(error)
        })
    },

    update(request, response){
        const {codigoEndereco, codigoPessoa, codigoBairro, nomeRua, numero, complemento, cep} = request.body;
        database.where({CODIGO_ENDERECO: codigoEndereco}).update({CODIGO_PESSOA: codigoPessoa, CODIGO_BAIRRO: codigoBairro, NOME_RUA: nomeRua, NUMERO: numero, COMPLEMENTO: complemento, CEP: cep}).table("tb_endereço").then(_endereco => {
            utils.retrieveData(response, 'tb_endereço')
        }).catch((error) =>{
            console.log(error)
        })
    },

    delete(request, response){
        const {CODIGO_ENDERECO} = request.body;
        database.where({CODIGO_ENDERECO: CODIGO_ENDERECO}).del().table("tb_endereço").then(_endereco => {
            utils.retrieveData(response, 'tb_endereço')
        }).catch((error) =>{
            console.log(error)
        })
    }
}