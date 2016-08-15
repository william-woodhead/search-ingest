import express from 'express';
import AWS from 'aws-sdk';
import { bulkIngest } from '../../controllers/ingestion/bulk';
export const ingestion = express.Router();

ingestion.get('/bulk', (req, res, next) => {
  bulkIngest().then((result) => {
    res.send(result);
  }).catch((err) => {
    next(err);
  });
});

ingestion.get('/events/_start', (req, res, next) => {
  res.send('start');
});

ingestion.get('/events/_stop', (req, res, next) => {
  res.send('stop');
});
