import { bulkIngestDefaults, EVENTS } from '../../../core/enums';
import { emit } from '../../../core/event-emitter';
import { getSlugs } from '../../../services/s3';
import reduce from 'lodash/reduce';

export function stop() {
  return new Promise((resolve, reject) => {
    emit(EVENTS.BULK_INGEST_STOP);
    resolve();
  });
}

export function start(config = {}) {
  const params = createBulkIngestionParams(config);
  return new Promise((resolve, reject) => {
    getSlugs(params).then((slugs) => {
      emit(EVENTS.BULK_INGEST, { ...params, slugs });
      resolve({ message: 'bulk ingest has begun...' });
    }).catch((err) => {
      emit(EVENTS.ERROR, err);
      reject({ message: 'bulk ingest went wrong...' });
    });
  });
}

function createBulkIngestionParams(config) {
  return reduce(config, (result, value, key) => {
    if (value) result[key] = value;
    return result;
  }, { ...bulkIngestDefaults, method: 'CREATE' });
}
