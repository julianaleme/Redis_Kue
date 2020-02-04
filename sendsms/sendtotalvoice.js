const totalvoice = require('totalvoice-node');
const client = new totalvoice("a06cc290b2eb629998aaeaf94c2b035d");
 
client.sms.enviar("19982470736", "Teste de Mensagem")
    .then(function (data) {
        console.log(data)
    })
    .catch(function (error) {
        console.error('Erro: ', error)
    });