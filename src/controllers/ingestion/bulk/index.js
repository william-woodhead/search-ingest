import winston from 'winston';
import { Elasticsearch } from '../../../core/elasticsearch';
import superagent from 'superagent';
import forEach from 'lodash/forEach';
import { S3 } from '../../../core/s3';

function getSlugs() {
  const s3 = new S3();
  const client = s3.getClient();
  return new Promise((resolve, reject) => {
    client.getObject({Bucket: 'dojo-search-ingest', Key: 'slugs_12082016.txt'}, (err, data) => {
      if (err) {
        return reject(err);
      }
      resolve(data.Body.toString().split('\n').slice(5000, 5200));
    });
  });
}

function requestListingContext(slug = '') {
  return new Promise((resolve, reject) => {
    if (!slug) {
      return reject(new Error('No slug string'));
    }
    superagent.get('http://dojo-master-api-development.eu-west-1.elasticbeanstalk.com/web/v1-0/LON/listings/' + slug).end((err, res) => {
      if (err) {
        return reject(err);
      }
      resolve(res.body.listing);
    });
  });
}

function postToIndex(listing) {
  return new Promise((resolve, reject) => {
    const elasticsearch = new Elasticsearch();
    const client = elasticsearch.getClient();
    client.index({
      index: 'london',
      type: 'listingContexts',
      body: listing
    }).then((result) => {
      resolve(result);
    }).catch((err) => {
      reject(err);
    });
  });
}

function processBatch(batch) {
  forEach(batch, (slug, index, array) => {
    requestListingContext(slug).then((result) => {
      postToIndex(result).then((result) => {
        winston.log('info', `listing context ${index + 1} of ${array.length}`);
      }).catch((err) => {
        winston.log('error', err, { slug });
      });
    }).catch((err) => {
      winston.log('error', err, { slug });
    });
  });
}

function stageJob(result, start, end, batchCount) {
  if (start >= result.length - 1) {
    winston.log('info', 'End of batches');
    return;
  }
  winston.log('info', `Batch count: ${batchCount}`);
  processBatch(result.slice(start, end));

  const newStart = end;
  const newEnd = end + 100 > result.length - 1 ? result.length - 1 : end + 100;
  const newBatchCount = batchCount + 1;

  setTimeout(() => {
    stageJob(result, newStart, newEnd, newBatchCount);
  }, 5000);
}

export function bulkIngest() {
  return new Promise((resolve, reject) => {
    getSlugs().then((result) => {
      const length = result.length;
      const firstEnd = length - 1 > 100 ? 100 : length - 1;
      stageJob(result, 0, firstEnd, 1);
    });
  });
}
