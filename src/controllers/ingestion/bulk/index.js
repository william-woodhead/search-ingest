import { startPipe, stopPipe } from '../../../pipes/ingestion/bulk';
import { bulkIngestDefaults } from '../../../core/enums';
import cloneDeep from 'lodash/cloneDeep';
import forEach from 'lodash/forEach';

export function stop() {
  return new Promise((resolve, reject) => {
    resolve();
    stopPipe();
  });
}

export function start(config = {}) {
  const defaults = cloneDeep(bulkIngestDefaults);
  forEach(config, (value, key) => {
    if (value) {
      defaults[key] = value;
    }
  });

  return new Promise((resolve, reject) => {
    resolve({
      message: 'bulk ingest has begun...'
    });
    startPipe(defaults);
  });
}
