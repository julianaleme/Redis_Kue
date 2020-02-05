module.exports.processJobs = function processJobs(jobs) {
    var mongoose = require('mongoose');
    var ActivityLog = require('../models/activity_log.js');
    var sendsms = require('../sendsms/apisendsms.js');


    const configMongo = {
        autoIndex: false,
        useNewUrlParser: true,
        useUnifiedTopology: true
    };
    
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/cbcphonesms',{configMongo});

    // Consumer / Worker for jobs testing
    jobs.process( 'activity_log', 1000, function ( job, done ) {
    console.log( 'Iniciando ' + job.data.phone );
    console.log("Executando activity_log jobs...");
    var activity_log = new ActivityLog({
                        phone: job.data.phone ,
                        linkwhats:job.data.linkwhats ,
                        nome:job.data.nome ,
                        status:job.data.status
                    });
    activity_log.save(function(err) {
        if (err)
        {
            console.log(err);
        }
        else
        {
            sendsms.dadossmsenvia(job.data.phone, job.data.linkwhats, job.data.nome, job.data.status) 
            setTimeout( function () {
                console.log( 'Fim de atividade log jobs: ' + job.data.phone );
                done();
                }, 100 );
            }
        });
    });
}