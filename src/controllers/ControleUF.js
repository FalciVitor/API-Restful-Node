const database = require ('../database/connection')
const utils = require('../utils/utils')

module.exports = {
    create(request, response){
        const {codigoUF, sigla, nome, status} = request.body;
        database.insert({CODIGO_UF: codigoUF, SIGLA: sigla, NOME: nome, STATUS: status}).table('tb_uf').then(_uf =>{
            response.status(201)
            utils.retrieveData(response, 'tb_uf')
        }).catch(error => {
            console.log(error)
        })
    },

    read(request, response){
        const CODIGO_UF = request.query.codigoUF;
        const SIGLA = request.query.sigla;
        

        if(CODIGO_UF){
            database.where({CODIGO_UF: CODIGO_UF}).select("").table("tb_uf").then(uf => {
                if(uf.length > 0){
                    let temp;
                    const object = [];
                    uf.forEach(uf =>{
                        temp = {
                            codigoUF:uf.CODIGO_UF,
                            sigla:uf.SIGLA,
                            nome:uf.NOME,
                            status:uf.STATUS,
                        }
                        object.push(temp)
                    })
                    response.json(object)
                }
                
            else{
                throw 'Nao existe nenhuma UF com este codigo!'
                }
            }).catch((error) => {
                response.status(404)
                response.json({
                    status:404,
                    mensagem: "Nao existe nenhuma UF com este codigo!"
                })
            })
        }

    else if(SIGLA){
        database.where({SIGLA: SIGLA}).select("").table("tb_uf").then(uf => {
            if(uf.length > 0){
                let temp;
                    const object = [];
                    uf.forEach(uf =>{
                        temp = {
                            codigoUF:uf.CODIGO_UF,
                            sigla:uf.SIGLA,
                            nome:uf.NOME,
                            status:uf.STATUS,
                        }
                        object.push(temp)
                    })
                    response.json(object)
            }
           else{
               throw 'Nao existe nenhuma UF com esta sigla!'
            }
        }).catch((error) => {
            response.status(404)
            response.json({
                status:404,
                mensagem: "Nao existe nenhuma UF com esta sigla!"
            })
        })
    }

    else{
        database.select("*").table("tb_uf").then(uf => {
        let temp;
        const object = [];
        uf.forEach(uf =>{
        temp = {
            codigoUF:uf.CODIGO_UF,
            sigla:uf.SIGLA,
            nome:uf.NOME,
            status:uf.STATUS,
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
        const {codigoUF, sigla, nome, status} = request.body;
        database.where({CODIGO_UF: codigoUF}).update({SIGLA: sigla, NOME: nome, STATUS: status}).table("tb_uf").then(_uf => {
            utils.retrieveData(response, 'tb_uf');
        }).catch((error) => {
            console.log(error)
        })
    },

    delete(request, response){
        const {CODIGO_UF} = request.body;
        database.where({CODIGO_UF: CODIGO_UF}).del().table("tb_uf").then(_uf => {
            utils.retrieveData(response, 'tb_uf')
        }).catch((error) => {
            console.log(error)
        })
    }
}