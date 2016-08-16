import winston from 'winston';
import { requestListingContext } from '../../../services/content-db';
import { requestAndIndex } from '../shared';
import { getSlugs } from '../../../services/s3';
import { postToIndex } from '../../../services/elasticsearch';
import forEach from 'lodash/forEach';

const BATCH_SIZE = 1;
const BATCH_TIMEOUT = 200;
let ingesting = false;

export function stopPipe() {
  if (!ingesting) return winston.log('error', 'bulk ingest is not running');
  ingesting = false;
  winston.log('info', 'bulk ingest has stopped');
}

export function startPipe(config) {
  ingesting = true;
  getSlugs(config).then((slugs) => {
    const NO_OF_SLUGS_ZEROED = slugs.length - 1;
    const firstEnd = NO_OF_SLUGS_ZEROED > BATCH_SIZE ? BATCH_SIZE : NO_OF_SLUGS_ZEROED;
    stageJob({
      slugs,
      startIndex: 0,
      endIndex: firstEnd,
      batchCount: 1,
      zeroedSize: NO_OF_SLUGS_ZEROED
    });
  }).catch((err) => {
    reject(err);
  });
}

function processBatch(batch) {
  forEach(batch, (slug, index, array) => {
    requestAndIndex(slug).catch((err) => {
      ingesting = false;
    });
  });
}

function stageJob({slugs, startIndex, endIndex, batchCount, zeroedSize}) {
  if (startIndex >= zeroedSize) {
    ingesting = false;
    return winston.log('info', 'End of batches');

  }

  if (!ingesting) {
    return winston.log('info', 'Ingestion stopped');
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
