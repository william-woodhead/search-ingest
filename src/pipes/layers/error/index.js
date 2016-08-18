import winston from 'winston';
import { EVENTS } from '../../../core/enums';
import { emit } from '../../../core/event-emitter';

export function listener(event, payload) {
  switch(event.type) {
    case EVENTS.ERROR:
      return errorHandler(payload);
    default:
      return;
  }
}

export function errorHandler(err = {}) {
  winston.log('error', err.stack);
}
