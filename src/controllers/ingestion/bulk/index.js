import { bulkIngestDefaults, EVENTS } from '../../../core/enums';
import { emit } from '../../../core/event-emitter';
import { getSlugs } from '../../../services/s3';
import cloneDeep from 'lodash/cloneDeep';
import forEach from 'lodash/forEach';

export function stop() {
  return new Promise((resolve, reject) => {
    resolve();
    emit(EVENTS.BULK_INGEST_STOP);
  });
}

export function start(config = {}) {
  const params = cloneDeep(bulkIngestDefaults);
  forEach(config, (value, key) => {
    if (value) {
      params[key] = value;
    }
  });

  params.method = 'CREATE';

  return new Promise((resolve, reject) => {
    resolve({
      message: 'bulk ingest has begun...'
    });

    getSlugs(params).then((slugs) => {
      emit(EVENTS.BULK_INGEST, { ...params, slugs });
    }).catch((err) => {
      emit(EVENTS.ERROR, err);
    });
  });
}
