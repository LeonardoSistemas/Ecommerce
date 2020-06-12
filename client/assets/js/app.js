var app = {};

app.eventos = {

    init: () => {

        $("#lblUsuarioLogado").text(app.metodos.obterValorSessao('nomeUsuario'));

        $('body').append("<div class='mask'></div>")

        $(".mask").addClass('animated fadeOut');

        setTimeout(() => {
            $(".mask").remove();
        }, 800);

    }

}

app.metodos = {

    // centraliza as chamadas de get
    get: (url, callbackSuccess, callbackError) => {

        try {
            if (app.metodos.validaToken()) {

                $.ajax({
                    url: url,
                    method: 'GET',
                    contentType: 'application/json; charset=utf-8',
                    dataType: "json",
                    beforeSend: (request) => { request.setRequestHeader("authorization", app.metodos.obterValorSessao('token')); },
                    success: (response) => callbackSuccess(response),
                    error: (xhr, ajaxOptions, error) => {

                        // se o retorno for não autorizado, redireciona o usuário para o login
                        if (xhr.status == 401) app.metodos.logout();

                        callbackError(xhr, ajaxOptions, error)
                    }
                });

            }
        }
        catch (ex) {
            return callbackError(null, null, ex);
        }

    },

    // centraliza as chamadas de post
    post: (url, dados, callbackSuccess, callbackError, login = false) => {

        try {
            if (app.metodos.validaToken(login)) {

                $.ajax({
                    url: url,
                    method: 'POST',
                    contentType: 'application/json; charset=utf-8',
                    dataType: "json",
                    data: dados,
                    beforeSend: (request) => { request.setRequestHeader("authorization", app.metodos.obterValorSessao('token')); },
                    success: (response) => callbackSuccess(response),
                    error: (xhr, ajaxOptions, error) => {

                        // se o retorno for não autorizado, redireciona o usuário para o login
                        if (xhr.status == 401) app.metodos.logout();

                        callbackError(xhr, ajaxOptions, error)
                    }
                });

            }
        }
        catch (ex) {
            return callbackError(null, null, ex);
        }

    },

    // centraliza as chamadas de put
    put: (url, dados, callbackSuccess, callbackError) => {

        try {
            if (app.metodos.validaToken()) {

                $.ajax({
                    url: url,
                    method: 'PUT',
                    contentType: 'application/json; charset=utf-8',
                    dataType: "json",
                    data: dados,
                    beforeSend: (request) => { request.setRequestHeader("authorization", app.metodos.obterValorSessao('token')); },
                    success: (response) => callbackSuccess(response),
                    error: (xhr, ajaxOptions, error) => {

                        // se o retorno for não autorizado, redireciona o usuário para o login
                        if (xhr.status == 401) app.metodos.logout();

                        callbackError(xhr, ajaxOptions, error)
                    }
                });

            }
        }
        catch (ex) {
            return callbackError(null, null, ex);
        }

    },

    // método para validar se o token existe. É chamado em todas as requisições internas
    validaToken: (login = false) => {

        var tokenAtual = app.metodos.obterValorSessao('token');

        if ((tokenAtual == undefined || tokenAtual == null || tokenAtual == "" || tokenAtual == 'null') && !login) {
            window.location.href = '/';
            return false;
        }

        return true;
    },

    // grava o token no localstorage
    gravarValorSessao: (valor, local) => {
        localStorage[local] = valor;
    },

    // retorna o token atual
    obterValorSessao: (local) => {

        // Valores Sessão -> [token] [nomeUsuario]
        return localStorage[local];

    },

    // método que limpa toda o localStorage e redireciona para o login
    logout: () => {

        localStorage.clear();
        window.location.href = '/';

    },

    // método genérico para mensagens
    mensagem: (msg, cor = 'red', time = null) => {

        // cor = red OU green

        $(".toasted").removeClass('hidden');
        $(".toasted").removeClass('bounceOutUp');

        $(".toasted .alert").removeClass('alert-danger');
        $(".toasted .alert").removeClass('alert-success');

        $(".toasted").addClass('bounceInDown');
        $(".toasted .msgErro").text(msg);

        if (cor == 'green') {
            $(".toasted .alert").addClass('alert-success');
        }
        else {
            $(".toasted .alert").addClass('alert-danger');
        }

        setTimeout(function () {

            $(".toasted").removeClass('bounceInDown');
            $(".toasted").addClass('bounceOutUp');

        }, time != null ? time : 3500);

    }

}