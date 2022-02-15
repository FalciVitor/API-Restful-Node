const database = require ('../database/connection')
const utils = require('../utils/utils')

module.exports = {
    create(request, response){
        const {codigoBairro, codigoMunicipio, nome, status} = request.body;
        database.insert({CODIGO_BAIRRO: codigoBairro, CODIGO_MUNICIPIO: codigoMunicipio, NOME: nome, STATUS: status}).table("tb_bairro").then(_bairro => {
            response.status(201)
            utils.retrieveData(response, 'tb_bairro')
        }).catch(error => {
            console.log(error)
        })
    },

    read(request, response){
        const CODIGO_BAIRRO = request.query.codigoBairro;
        const CODIGO_MUNICIPIO = request.query.codigoMunicipio;

        if(CODIGO_BAIRRO){
            database.where({CODIGO_BAIRRO: CODIGO_BAIRRO}).select("").table("tb_bairro").then(bairro => {
                if(bairro.length > 0){
                    let temp;
                    const object = [];
                    bairro.forEach(bairro =>{
                        temp = {
                            codigoBairro:bairro.CODIGO_BAIRRO,
                            codigoMunicipio:bairro.CODIGO_MUNICIPIO,
                            nome:bairro.NOME,
                            status:bairro.STATUS,
                        }
                        object.push(temp)
                    })
                    response.json(object)
                }
            else{
                throw 'Nao existe nenhum bairro com este codigo!'
                }
            }).catch((error) => {
                response.status(404)
                response.json({
                    status:404,
                    mensagem: "Nao existe nenhum bairro com este codigo!"
                })
            })
        }

    else if(CODIGO_MUNICIPIO){
        database.where({CODIGO_MUNICIPIO: CODIGO_MUNICIPIO}).select("").table("tb_bairro").then(bairro => {
            if(bairro.length > 0){
                let temp;
                const object = [];
                bairro.forEach(bairro =>{
                    temp = {
                        codigoBairro:bairro.CODIGO_BAIRRO,
                        codigoMunicipio:bairro.CODIGO_MUNICIPIO,
                        nome:bairro.NOME,
                        status:bairro.STATUS,
                    }
                    object.push(temp)
                })
                response.json(object)
            }
           else{
               throw 'Nao existe nenhum bairro atrelado a esse codigo!'
            }
        }).catch((error) => {
            response.status(404)
            response.json({
                status:404,
                mensagem: "Nao existe nenhum bairro atrelado a esse codigo!"
            })
        })
    }

    else{
        database.select("*").table("tb_bairro").then(bairro => {
            let temp;
            const object = [];
            bairro.forEach(bairro =>{
                temp = {
                    codigoBairro:bairro.CODIGO_BAIRRO,
                    codigoMunicipio:bairro.CODIGO_MUNICIPIO,
                    nome:bairro.NOME,
                    status:bairro.STATUS,
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
        const {codigoBairro, codigoMunicipio, nome, status} = request.body;
        database.where({CODIGO_BAIRRO: codigoBairro}).update({CODIGO_MUNICIPIO: codigoMunicipio, NOME: nome, STATUS: status}).table("tb_bairro").then(_bairro =>{
            utils.retrieveData(response, 'tb_bairro')
        }).catch((error) => {
            console.log(error)
        })
    },

    delete(request, response){
        const {CODIGO_BAIRRO} = request.body;
        database.where({CODIGO_BAIRRO: CODIGO_BAIRRO}).del().table("tb_bairro").then(_bairro => {
            utils.retrieveData(response, 'tb_bairro')
        }).catch((error) => {
            console.log(error)
        })
    }
}