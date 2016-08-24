import { getDocuments } from '../../../services/elasticsearch';
import { EVENTS } from '../../../core/enums';
import { emit } from '../../../core/event-emitter';

export function listener(event, payload) {
  switch(event.type) {
    case EVENTS.METHOD_UPDATE:
      return getFromES(payload);
    default:
      return;
  }
}

function getFromES(config = {}) {
  return getDocuments(config).then((result) => {
    const id = result && result.hits && result.hits.hits && result.hits.hits[0] && result.hits.hits[0]._id ? result.hits.hits[0]._id : undefined;
    if (!id) emit(EVENTS.ERROR, new Error(`cant find document to update for slug: ${config.slug} - This action might be creating a duplicate in the index`));
    emit(EVENTS.RESPONSE_FROM_ES, { ...config, id });
  }).catch((err) => {
    emit(EVENTS.ERROR, err);
  });
}
