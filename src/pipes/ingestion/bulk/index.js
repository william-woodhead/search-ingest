import winston from 'winston';
import { requestListingContext } from '../../../services/content-db';
import { requestAndIndex } from '../shared';
import { getSlugs } from '../../../services/s3';
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
  if (ingesting) return winston.log('error', `We are already ingesting a bulk job`);

  ingesting = true;
  getSlugs(config).then((slugs) => {
    stagedIteration({ slugs, config, index: 0, zeroedSize: slugs.length - 1 });
  }).catch((err) => {
    winston.log('error', err);
    ingesting = false;
  });
}

function stagedIteration({ slugs, config, index, zeroedSize }) {
  if (index > zeroedSize) {
    ingesting = false;
    return winston.log('info', 'End of ingestion');
  }

  if (!ingesting) return winston.log('info', 'Ingestion stopped');

  requestAndIndex({ config, slug: slugs[index] }).then(() => {
    winston.log('info', `index: ${index}`);
  }).catch((err) => {
    winston.log('error', err);
    ingesting = false;
  });

  setTimeout(() => {
    stagedIteration({ slugs, config, index: index + 1, zeroedSize });
  }, BATCH_TIMEOUT);
}
