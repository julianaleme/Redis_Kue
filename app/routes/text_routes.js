module.exports = function(app, db, jobs) {
  const queue = require('../../queueprocess/queue.js')
  const worker = require ('../../worker/worker.js')
    app.post('/smssend', (req, res) => {
      queue.criafilakue(jobs,req.body)
      worker.processJobs(jobs)
      res.send('Requisição enviada! Job: ' + req.body.celVisitante)
    });
  };