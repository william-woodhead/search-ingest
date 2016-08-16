import winston from 'winston';
import forEach from 'lodash/forEach';
import { requestListingContext } from '../../../services/content-db';
import { getSlugs } from '../../../services/s3';
import { postToIndex } from '../../../services/elasticsearch';

const BATCH_SIZE = 1;
const BATCH_TIMEOUT = 200;
let ingesting = false;

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

function stageJob({slugs, startIndex, endIndex, batchCount, zeroedSize}) {
  if (startIndex >= zeroedSize) {
    winston.log('info', 'End of batches');
    ingesting = false;
    return;
  }

  if (!ingesting) {
    winston.log('info', 'Ingestion stopped');
    return;
  }

  winston.log('info', `Batch count: ${batchCount}`);
  processBatch(slugs.slice(startIndex, endIndex));

  const newStart = endIndex;
  const newEnd = endIndex + BATCH_SIZE > zeroedSize ? zeroedSize : endIndex + BATCH_SIZE;
  const newBatchCount = batchCount + 1;

  setTimeout(() => {
    stageJob({
      slugs,
      startIndex: newStart,
      endIndex: newEnd,
      batchCount: newBatchCount,
      zeroedSize
    });
  }, BATCH_TIMEOUT);
}

export function stop() {
  return new Promise((resolve, reject) => {
    if (!ingesting) {
      return resolve({
        message: 'bulk ingest is not running'
      });
    }

    ingesting = false;
    resolve({
      message: 'bulk ingest has stopped'
    });
  });
}

export function start() {
  ingesting = true;
  return new Promise((resolve, reject) => {
    getSlugs().then((result) => {
      const NO_OF_SLUGS_ZEROED = result.length - 1;
      const firstEnd = NO_OF_SLUGS_ZEROED > BATCH_SIZE ? BATCH_SIZE : NO_OF_SLUGS_ZEROED;
      resolve({
        message: 'bulk ingest has begun...'
      });
      stageJob({
        slugs: result,
        startIndex: 0,
        endIndex: firstEnd,
        batchCount: 1,
        zeroedSize: NO_OF_SLUGS_ZEROED
      });
    });
  });
}
