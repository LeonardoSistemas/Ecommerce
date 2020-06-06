const AcessoDados = require('../db/acessodados.js');
const db = new AcessoDados();
const UsuarioTokenAcesso = require('../common/protecaoAcesso');
const Acesso = new UsuarioTokenAcesso();
const crypto = require('crypto');
const ReadCommandSql = require('../common/readCommandSql');
const readCommandSql = new ReadCommandSql();

const controllers = () => {

    const login = async (req) => {

        var password = req.body.Senha;

        var ComandoSQL = await readCommandSql.retornaStringSql('login', 'login');
        var usuarioBanco = await db.Query(ComandoSQL, req.body);

        console.log('usuarioBanco', usuarioBanco)

        if (usuarioBanco != undefined && usuarioBanco.length > 0) {

            // valida se as senhas são diferentes
            var hashSenha = crypto.createHmac('sha256', password).digest('hex');

            console.log('hashSenha', hashSenha);
            console.log('usuarioBanco[0].Senha', usuarioBanco[0].Senha)

            if (hashSenha.toLowerCase() != usuarioBanco[0].Senha.toLowerCase()) {
                return { 
                    status: 'error', 
                    mensagem: "Senha incorreta." 
                };
            }

            // se estiver tudo ok, gera o token e retorna o json
            var tokenAcesso = Acesso.gerarTokenAcesso(req.body);

            return {
                TokenAcesso: tokenAcesso,
                Nome: usuarioBanco[0].Nome,
                Email: usuarioBanco[0].Email,
                Telefone: usuarioBanco[0].Telefone,
                Time: usuarioBanco[0].Time,
                status: 'success'
            };

        }
        else {
            return {
                status: 'error',
                mensagem: "Usuário não cadastrado no sistema"
            };
        }
    };

    return Object.create({
        login
    })

}

module.exports = Object.assign({ controllers })