var config = {
    dev: {
        url: 'http://localhost',
        port: 3000,
        ambiente: 'DEV',
        session: {
            secret: 'teste',
            resave: false,
            saveUninitialized: false,
            cookie: { secure: false }
        },
        database: {
            host: 'mysql669.umbler.com',
            port: 41890,
            user: 'cartoleo',
            password: 'cart0le0',
            database: 'cartoleo'
        },
        tokenPS: "A77F8116643E477AA362ACF21F8155A0",
        urlWSPS: "https://ws.sandbox.pagseguro.uol.com.br",
        urlPS: "https://sandbox.pagseguro.uol.com.br",
        emailPS: "cartoleobebedouro@gmail.com"
    },
    prod: {
        url: 'http://localhost',
        port: 3000,
        ambiente: 'PROD',
        session: {
            secret: 'teste',
            resave: false,
            saveUninitialized: false,
            cookie: { secure: false }
        },
        database: {
            host: 'mysql669.umbler.com',
            port: 41890,
            user: 'cartoleo',
            password: 'cart0le0',
            database: 'cartoleo'
        },
        tokenPS: "f00e3008-bf29-4ae8-932e-0418c0ffc8a9774ff39143c6b5325fa8d65a62dd11b4d721-6bb4-47fd-abe9-4d22733d2f6f",
        urlWSPS: "https://ws.pagseguro.uol.com.br",
        urlPS: "https://pagseguro.uol.com.br",
        emailPS: "cartoleobebedouro@gmail.com"
    }
}

exports.get = function get(env) {

    if(env.toLowerCase() == "dev")
        return config.dev;

    if(env.toLowerCase() == "prod")
        return config.prod;
        
}