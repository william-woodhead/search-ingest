import winston from 'winston';
import forEach from 'lodash/forEach';
import { requestListingContext } from '../../../services/listing-contexts';
import { getSlugs } from '../../../services/s3';
import { postToIndex } from '../../../services/elasticsearch';

const BATCH_SIZE = 100;
const BATCH_TIMEOUT = 10 * 1000;

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

export function bulkIngest() {
  return new Promise((resolve, reject) => {
    getSlugs().then((result) => {
      const NO_OF_SLUGS_ZEROED = result.length - 1;
      const firstEnd = NO_OF_SLUGS_ZEROED > BATCH_SIZE ? BATCH_SIZE : NO_OF_SLUGS_ZEROED;
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
