import EventEmitter from 'events';
class IngestionEmitter extends EventEmitter {}

const eventEmitter = new IngestionEmitter();

export function emit(type, payload) {
  if (!type) {
    throw new Error('Cannot have undefined type on event');
    return;
  }
  eventEmitter.emit('event', { type }, payload);
}

export function subscribe(listener) {
  eventEmitter.on('event', listener);
}
