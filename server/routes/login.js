const controllerLogin = require('../controllers/login')
const UsuarioTokenAcesso = require('../common/protecaoAcesso');
const Acesso = new UsuarioTokenAcesso();

module.exports = (server) => {

    server.post('/login', async (req, res, next) => {
        const result = await controllerLogin.controllers().login(req)
        res.send(result);
        return next();
    });

    server.get('/validaAcesso', Acesso.verificaTokenAcesso, async (req, res, next) => {
        res.send(true);
        return next();
    });

}