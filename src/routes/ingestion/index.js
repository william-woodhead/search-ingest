import express from 'express';
import AWS from 'aws-sdk';
import { bulkIngest } from '../../controllers/ingestion/bulk';
import { start, stop } from '../../controllers/ingestion/event-driven';
export const ingestion = express.Router();

ingestion.get('/bulk', (req, res, next) => {
  bulkIngest().then((result) => {
    res.send(result);
  }).catch((err) => {
    next(err);
  });
});

ingestion.get('/events/_start', (req, res, next) => {
  start().then((result) => {
    res.send(result);
  }).catch((err) => {
    next(err);
  });
});

ingestion.get('/events/_stop', (req, res, next) => {
  stop().then((result) => {
    res.send(result);
  }).catch((err) => {
    next(err);
  });
});
