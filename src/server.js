import express from 'express';
import winston from 'winston';
import bodyParser from 'body-parser';
import compress from 'compression';
import { indices } from './routes/indices';
import { ingestion } from './routes/ingestion';
import { CONFIG } from './config';
import { Elasticsearch } from './clients/elasticsearch';
import { S3 } from './clients/s3';
import { SQS } from './clients/sqs';
import './pipes/layers';

// set up singletons
new Elasticsearch();
new S3();
new SQS();

const app = express();

app.set('port', CONFIG.port);
app.set('env', CONFIG.env);
app.use(compress());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/indices', indices);
app.use('/ingestion', ingestion);

app.use((err, req, res, next) => {
  winston.log('error', err);
  res.status(err.status || 500);
  res.send(err.stack);
});

app.listen(app.get('port'), () => {
  winston.log('info', `Server listening on port ${app.get('port')} in ${app.get('env')} mode`, { url: `http://localhost:${app.get('port')}/helloworld` });
});
