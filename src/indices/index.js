import express from 'express';
export const indices = express.Router();

indices.get('/:indexName/_create', (req, res, next) => {
  res.send(`create - ${req.params.indexName}`);
});

indices.get('/:indexName/_delete', (req, res, next) => {
  res.send(`delete - ${req.params.indexName}`);
});

indices.get('/:indexName/_reindex', (req, res, next) => {
  res.send(`reindex - ${req.params.indexName}`);
});
