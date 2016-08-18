import { listener } from '../../../pipes/layers/parse-sqs';
import { start as startSQS, stop as stopSQS } from '../../../services/sqs';

export function start() {
  return new Promise((resolve, reject) => {
    startSQS(listener);
    resolve({ message: 'event listener started' });
  });
}

export function stop() {
  return new Promise((resolve, reject) => {
    stopSQS();
    resolve({ message: 'event listener stopped' });
  });
}
