import { sqsMessageToObj } from '../../../utils';
import { listingContextPipe } from './listing-context';

export function listener(message) {
  const attrs = sqsMessageToObj(message);
  switch(attrs.type) {
    case 'listingContext':
      return listingContextPipe(attrs);
    default:
      return;
  }
}
