const database = require ('../database/connection')
const utils = require('../utils/utils')

module.exports = {
    create(request, response){
        const {codigoUF, codigoMunicipio, nome, status} = request.body;
        database.insert({CODIGO_UF: codigoUF, CODIGO_MUNICIPIO: codigoMunicipio, NOME: nome, STATUS: status}).table("tb_municipio").then(_municipio => {
            response.status(201)
            utils.retrieveData(response, 'tb_municipio')
        }).catch(error => {
            console.log(error)
        })
    },

    read(request, response){
        const CODIGO_MUNICIPIO = request.query.codigoMunicipio;
        const NOME = request.query.nome;
        const CODIGO_UF = request.query.codigoUF;

        if(CODIGO_MUNICIPIO){
            database.where({CODIGO_MUNICIPIO: CODIGO_MUNICIPIO}).select("*").table("tb_municipio").then(municipio => {
                if(municipio.length > 0){
                    let temp;
                    const object = [];
                    municipio.forEach(municipio =>{
                        temp = {
                            codigoMunicipio:municipio.CODIGO_MUNICIPIO,
                            codigoUF:municipio.CODIGO_UF,
                            nome:municipio.NOME,
                            status:municipio.STATUS,
                        }
                        object.push(temp)
                    })
                    response.json(object)
                }
            else{
                throw 'Nao existe nenhum municipio com este codigo!'
                }
            }).catch((error) => {
                response.status(404)
                response.json({
                    status:404,
                    mensagem: "Nao existe nenhum municipio com este codigo!"
                })
            })
        }

    else if(NOME){
        database.where({NOME: NOME}).select("*").table("tb_municipio").then(municipio => {
            if(municipio.length > 0){
                let temp;
                const object = [];
                municipio.forEach(municipio =>{
                    temp = {
                        codigoMunicipio:municipio.CODIGO_MUNICIPIO,
                        codigoUF:municipio.CODIGO_UF,
                        nome:municipio.NOME,
                        status:municipio.STATUS,
                    }
                    object.push(temp)
                })
                response.json(object)
            }
           else{
               throw 'Nao existe nenhum municipio com esta sigla!'
            }
        }).catch((error) => {
            response.status(404)
            response.json({
                status:404,
                mensagem: "Nao existe nenhum municipio com esta sigla!"
            })
        })
    }

    else if(CODIGO_UF){
        database.where({CODIGO_UF: CODIGO_UF}).select("*").table("tb_municipio").then(municipio => {
            if(municipio.length > 0){
                let temp;
                const object = [];
                municipio.forEach(municipio =>{
                    temp = {
                        codigoMunicipio:municipio.CODIGO_MUNICIPIO,
                        codigoUF:municipio.CODIGO_UF,
                        nome:municipio.NOME,
                        status:municipio.STATUS,
                    }
                    object.push(temp)
                })
                response.json(object)
            }
           else{
               throw 'Nao existe nenhum municipio com atrelado a esse codigoUF!'
            }
        }).catch((error) => {
            response.status(404)
            response.json({
                status:404,
                mensagem: "Nao existe nenhum municipio com atrelado a esse codigoUF!"
            })
        })
    }

    else{
        database.select("*").table("tb_municipio").then(municipio => {
            let temp;
            const object = [];
            municipio.forEach(municipio =>{
                temp = {
                    codigoMunicipio:municipio.CODIGO_MUNICIPIO,
                    codigoUF:municipio.CODIGO_UF,
                    nome:municipio.NOME,
                    status:municipio.STATUS,
                }
                object.push(temp)
            })
            response.json(object)
        }).catch((error) => {
            response.status(404)
            response.json({
                status:404,
                mensagem: "Não foi possível conectar com banco de dados!"
            })
        })
    }
},

    update(request, response){
        const {codigoMunicipio, codigoUF, nome, status} = request.body;
        database.where({CODIGO_MUNICIPIO: codigoMunicipio}).update({CODIGO_UF: codigoUF, NOME: nome, STATUS: status}).table("tb_municipio").then(_municipio => {
            utils.retrieveData(response, 'tb_municipio')
        }).catch((error) => {
            console.log(error)
        })
    },

    delete(request, response){
        const {CODIGO_MUNICIPIO} = request.body;
        database.where({CODIGO_MUNICIPIO: CODIGO_MUNICIPIO}).del().table("tb_municipio").then(_municipio => {
            utils.retrieveData(response, 'tb_municipio')
        }).catch((error) => {
            console.log(error)
        })
    }
}