var mysql = require('mysql');

module.exports = class AcessoDados {

    async Query(SqlQuery, parametros) {

        try {

            var SqlQueryUp = SqlQuery;
            var retorno;
            var connection = mysql.createConnection(global.env.database);

            // percorre os parametros
            if (parametros) {
                let p = parametros;

                for (let key in p) {

                    if (p.hasOwnProperty(key)) {

                        let campo = key;
                        let valor = p[key];

                        // valida se é para forçar o tipo para String (str)
                        if (campo.indexOf('str') != 0) {

                            // valida se é número
                            if (valor != '' && !isNaN(valor)) {
                                // valida se é float ou int
                                if (!Number.isInteger(parseFloat(valor))) // float
                                    SqlQueryUp = SqlQueryUp.replace('@' + campo, valor);
                                else // int
                                    SqlQueryUp = SqlQueryUp.replace('@' + campo, valor);
                            }
                             // valida se é data (yyyy-MM-dd)
                            else if (valor != '' && valor.split('-').length == 3) //date
                                    SqlQueryUp = SqlQueryUp.replace('@' + campo, `'${valor}'`);

                            else {
                                SqlQueryUp = SqlQueryUp.replace('@' + campo, `'${valor}'`);
                            }

                        }
                        else {
                            SqlQueryUp = SqlQueryUp.replace('@' + campo, `'${valor}'`);
                        }

                    }
                }
            }

            connection.connect();

            await new Promise((resolve, reject) => {

                connection.query(SqlQueryUp, function (error, results, fields) {
                    if (error) { reject(); throw error }    
                    retorno = results
                    resolve()
                });

            })
            
            connection.end();
            return retorno;

        } catch (error) {
            return error;
        }
    }

    constructor(user) {
        this.sql = require('../node_modules/mssql')
            , this.types = require('../node_modules/mssql').types
            , this.process = require('process')
            , this.pid = this.process.pid
            , this.ControleId = 0
            , this.config = global.env.database
    }

    async ExecuteQuery(SqlQuery, parametros) {

        try {
            const pool = new this.sql.ConnectionPool(this.config);
            await pool.connect();

            let request = await pool.request();

            if (parametros) {
                let p = parametros;

                for (let key in p) {

                    if (p.hasOwnProperty(key)) {

                        let campo = key;
                        let valor = p[key];
                        let tipo = this.sql.VarChar;

                        // valida se é para forçar o tipo para String (str)
                        if (campo.indexOf('str') != 0) {

                            // valida se é número
                            if (valor != '' && !isNaN(valor)) {
                                // valida se é float ou int
                                if (!Number.isInteger(parseFloat(valor)))
                                    tipo = this.sql.Float
                                else
                                    tipo = this.sql.Int
                            }
                            else {
                                // valida se é data (yyyy-MM-dd)
                                if (valor != '' && valor.split('-').length == 3)
                                    tipo = this.sql.Date
                            }

                        }
                        else {
                            campo = campo.replace('str', '');
                        }

                        request = await request.input(campo, tipo, valor);
                    }
                }
            }

            var result = await request.query(SqlQuery);
            pool.close();
            return result;

        } catch (error) {
            return error;
        }

    }

}