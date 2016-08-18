import { postToIndex } from '../../../services/elasticsearch';
import { emit } from '../../../core/event-emitter';
import { EVENTS } from '../../../core/enums';

export function listener(event, payload) {
  switch(event.type) {
    case EVENTS.RESPONSE_FROM_DB:
      return index(payload);
    default:
      return;
  }
}

function index(config = {}) {
  postToIndex(config).then((result) => {
    emit(EVENTS.DOCUMENT_INDEXED, config);
  }).catch((err) => {
    emit(EVENTS.ERROR, err);
  });
}
