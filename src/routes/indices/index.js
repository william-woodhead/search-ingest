import express from 'express';
import { create } from '../../controllers/indices/create';
import winston from 'winston';
export const indices = express.Router();

indices.get('/:name/_create', (req, res, next) => {
  create({ name: req.params.name }).then((result) => {
    res.send(result);
  }).catch((err) => {
    next(err);
  });
});

indices.get('/:name/_delete', (req, res, next) => {
  res.send(`delete - ${req.params.name}, This is not setup yet as a route`);
});

indices.get('/:name/_reindex', (req, res, next) => {
  res.send(`reindex - ${req.params.name}, This is not setup yet as a route`);
});
