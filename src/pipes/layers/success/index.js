import winston from 'winston';
import { EVENTS } from '../../../core/enums';
import { emit } from '../../../core/event-emitter';

export function listener(event, payload) {
  switch(event.type) {
    case EVENTS.DOCUMENT_INDEXED:
      return success(payload);
    default:
      return;
  }
}

export function success(config = {}) {
  winston.log('info', `listing context ${config.slug} indexed`);
}
