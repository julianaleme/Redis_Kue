const totalvoice = require('totalvoice-node');
const client = new totalvoice("a06cc290b2eb629998aaeaf94c2b035d");

module.exports.dadossmsenvia = function dadossmsenvia(phone, linkwhats, nome) {
    var cMensagem = '#SomosTodosCobrecom-Obrigado pela visita!-Representante:' + nome //+ ' ' + linkwhats
    client.sms.enviar(phone,cMensagem) 
    .then(function (data) {
        console.log(data)
    })
    .catch(function (error) {
        console.error('Erro: ', error)
    });
}