const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors')

let redisConfig;
if (process.env.NODE_ENV === 'production') {
  redisConfig = {
    redis: {
      port: process.env.REDIS_PORT,
      host: process.env.REDIS_HOST,
      auth: process.env.REDIS_PASS,
      options: {
        no_ready_check: false
      }
    }
  };
} else {
  redisConfig = {};
}
const kue = require('kue');
const jobs = kue.createQueue(redisConfig);

const corsOptions = {
  origin: '*'
}

app.use(cors())
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

kue.app.listen( 3030 );

jobs.setMaxListeners(1000) // <- golden method
jobs.watchStuckJobs(1000 * 10);
jobs.on('ready', () => {
  console.info('Kue esta ativo!');
});

jobs.on('error', (err) => {
  console.error('Erro na ativação da Kue');
  console.error(err);
  console.error(err.stack);
});

const port = process.env.PORT || 7001;

require('./app/routes')(app, {},jobs);
app.listen(port, () => {
  console.log('Online na porta ' + port);
});