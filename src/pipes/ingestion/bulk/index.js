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
    stagedIteration({ slugs, index: 0, zeroedSize: slugs.length - 1 });
  }).catch((err) => {
    reject(err);
  });
}

function stagedIteration({slugs, index, zeroedSize}) {
  if (index > zeroedSize) {
    ingesting = false;
    return winston.log('info', 'End of ingestion');
  }

  if (!ingesting) return winston.log('info', 'Ingestion stopped');

  requestAndIndex(slugs[index]).then(() => {
    winston.log('info', `index: ${index}`);
  }).catch((err) => {
    ingesting = false;
  });

  setTimeout(() => {
    stagedIteration({ slugs, index: index + 1, zeroedSize });
  }, BATCH_TIMEOUT);
}
