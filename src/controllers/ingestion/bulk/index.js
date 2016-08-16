import { startPipe, stopPipe } from '../../../pipes/ingestion/bulk';

export function stop() {
  return new Promise((resolve, reject) => {
    resolve();
    stopPipe();
  });
}

export function start(config = {}) {
  return new Promise((resolve, reject) => {
    resolve({
      message: 'bulk ingest has begun...'
    });
    startPipe(config);
  });
}
