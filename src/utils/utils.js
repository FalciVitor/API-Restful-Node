const database = require('../database/connection')

function retrieveData(response, table){
    database.select("*").table(table).then(result => {
        if(table === 'tb_uf')
        {
            let listaUF = [];
            for (let linha = 0; linha < result.length; linha++) 
            {
                let ufAtual = 
                {
                    codigoUF : result[linha].CODIGO_UF,
                    sigla : result[linha].SIGLA,
                    nome : result[linha].NOME,
                    status : result[linha].STATUS
                }
                listaUF.push(ufAtual);
            }
            response.json(listaUF);
        }
        
        else if(table === 'tb_municipio')
        {
            let listaMunicipio = [];
            for (let linha = 0; linha < result.length; linha++) 
            {
                let MunicipioAtual = 
                {
                    codigoMunicipio : result[linha].CODIGO_MUNICIPIO,
                    codigoUF: result[linha].CODIGO_UF,
                    nome : result[linha].NOME,
                    status : result[linha].STATUS
                }
                listaMunicipio.push(MunicipioAtual);
            }
            response.json(listaMunicipio);
        }
        
        else if(table === 'tb_bairro')
        {
            let listaBairro = [];
            for (let linha = 0; linha < result.length; linha++) 
            {
                let BairroAtual = 
                {
                    codigoBairro : result[linha].CODIGO_BAIRRO,
                    codigoMunicipio: result[linha].CODIGO_MUNICIPIO,
                    nome : result[linha].NOME,
                    status : result[linha].STATUS
                }
                listaBairro.push(BairroAtual);
            }
            response.json(listaBairro);
        }
        else if(table === 'tb_pessoa')
        {
            let listaPessoa = [];
            for (let linha = 0; linha < result.length; linha++) 
            {
                let PessoaAtual = 
                {
                    codigoPessoa : result[linha].CODIGO_PESSOA,
                    nome : result[linha].NOME,
                    sobrenome : result[linha].SOBRENOME,
                    idade : result[linha].IDADE,
                    login : result[linha].LOGIN,
                    senha : result[linha].SENHA,
                    status : result[linha].STATUS
                }
                listaPessoa.push(PessoaAtual);
            }
            response.json(listaPessoa);
        }

        else if(table === 'tb_endereço')
        {
            let listaEndereço = [];
            for (let linha = 0; linha < result.length; linha++) 
            {
                let EndereçoAtual = 
                {
                    codigoPessoa : result[linha].CODIGO_PESSOA,
                    codigoMunicipio : result[linha].CODIGO_MUNICIPIO,
                    nomeRua : result[linha].NOME_RUA,
                    numero : result[linha].NUMERO,
                    complemento : result[linha].COMPLEMENTO,
                    cep : result[linha].CEP,
                }
                listaEndereço.push(EndereçoAtual);
            }
            response.json(listaEndereço);
        }
        else{
            response.json(result)
        }
    }
)}

module.exports = {
    retrieveData
}