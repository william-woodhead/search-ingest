import { sqsMessageToObj } from '../../../utils';
import { EVENTS } from '../../../core/enums';
import { emit } from '../../../core/event-emitter';

export function listener(message) {
  emit(EVENTS.PARSE_SQS, sqsMessageToObj(message));
}
