import { EVENTS } from '../../../core/enums';
import { emit } from '../../../core/event-emitter';

export function listener(event, payload) {
  switch(event.type) {
    case EVENTS.ITERATOR_RELEASE:
      return methodParse(payload);
    default:
      return;
  }
}

export function methodParse(config = {}) {
  switch(config.method) {
    case 'CREATE': return create(config);
    case 'UPDATE': return update(config);
    default: return;
  }
}

function create(config = {}) {
  emit(EVENTS.METHOD_CREATE, config);
}

function update(config = {}) {
  emit(EVENTS.METHOD_UPDATE, config);
}
