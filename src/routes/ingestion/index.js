import express from 'express';
import AWS from 'aws-sdk';
import { start as bulkStart, stop as bulkStop } from '../../controllers/ingestion/bulk';
import { start, stop } from '../../controllers/ingestion/event-driven';
export const ingestion = express.Router();

ingestion.get('/bulk/_start', (req, res, next) => {
  const { bucketkey, index, type } = req.query;
  bulkStart({ bucketkey, index, bucketkey }).then((result) => {
    res.send(result);
  }).catch((err) => {
    next(err);
  });
});

ingestion.get('/bulk/_stop', (req, res, next) => {
  bulkStop().then((result) => {
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
