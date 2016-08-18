import winston from 'winston';
import { iterator } from '../../../utils';
import { emit } from '../../../core/event-emitter';
import { EVENTS } from '../../../core/enums';

const STAGE_TIMEOUT = 200;
let ingesting = false;

export function listener(event, payload) {
  switch(event.type) {
    case EVENTS.PARSE_SQS:
    case EVENTS.BULK_INGEST:
      return slugStager(payload);
    case EVENTS.BULK_INGEST_STOP:
      return stop();
    default:
      return;
  }
}

function slugStager(config = {}) {
  ingesting = true;
  const { slugs } = config;
  if (!slugs) return emit(EVENTS.ERROR, new Error('undefined slugs'));

  const exposer = iterator(slugs);
  const interval = setInterval(() => {
    const { value, done } = exposer.next();
    if (done) {
      ingesting = false;
      winston.log('info', 'End of cycle');
      return clearInterval(interval);
    }
    if (!ingesting) {
      winston.log('info', 'Terminated ingestion');
      return clearInterval(interval);
    }

    emit(EVENTS.ITERATOR_RELEASE, { ...config, slug: value });
  }, STAGE_TIMEOUT);
}

function stop() {
  ingesting = false;
}
