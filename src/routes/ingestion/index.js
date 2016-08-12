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


function makeRequests(slugs) {
  var subset = slugs.slice(0, 100);
  forEach(subset, function(slug) {
    superagent.get('http://dojo-master-api-development.eu-west-1.elasticbeanstalk.com/web/v1-0/LON/listings/' + slug).end(function(err, res) {
      if (err) {
        console.log(err);
        return;
      }
      indexListingVersion(res.body.listing);
    });
  });
}
