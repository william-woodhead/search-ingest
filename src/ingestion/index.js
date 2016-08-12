import express from 'express';
export const ingestion = express.Router();

ingestion.get('/bulk', (req, res, next) => {
  res.send('bulk');
});

ingestion.get('/events/_start', (req, res, next) => {
  res.send('start');
});

ingestion.get('/events/_stop', (req, res, next) => {
  res.send('stop');
});
