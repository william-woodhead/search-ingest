import express from 'express';
import { createIndex } from '../../controllers/indices/create';
import { deleteIndex } from '../../controllers/indices/delete';
import winston from 'winston';
export const indices = express.Router();

indices.get('/:name/_create', (req, res, next) => {
  createIndex({ name: req.params.name }).then((result) => {
    res.send(result);
  }).catch((err) => {
    next(err);
  });
});

indices.get('/:name/_delete', (req, res, next) => {
  deleteIndex({ name: req.params.name }).then((result) => {
    res.send(result);
  }).catch((err) => {
    next(err);
  });
});

indices.get('/:name/_reindex', (req, res, next) => {
  res.send(`reindex - ${req.params.name}, This is not setup yet as a route`);
});
