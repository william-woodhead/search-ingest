import { bulkIngestDefaults, EVENTS } from '../../../core/enums';
import { emit } from '../../../core/event-emitter';
import { getSlugs } from '../../../services/s3';
import reduce from 'lodash/reduce';

export function stop() {
  return new Promise((resolve, reject) => {
    resolve();
    emit(EVENTS.BULK_INGEST_STOP);
  });
}

export function start(config = {}) {
  const params = reduce(config, (result, value, key) => {
    if (value) result[key] = value;
    return result;
  }, { ...bulkIngestDefaults, method: 'CREATE' });

  return new Promise((resolve, reject) => {
    resolve({ message: 'bulk ingest has begun...' });

    getSlugs(params).then((slugs) => {
      emit(EVENTS.BULK_INGEST, { ...params, slugs });
    }).catch((err) => {
      emit(EVENTS.ERROR, err);
    });
  });
}
