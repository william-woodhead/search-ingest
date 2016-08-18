import { listener } from '../../../pipes/layers/parse-sqs';
import { start as startSQS, stop as stopSQS } from '../../../services/sqs';

export function start() {
  return new Promise((resolve, reject) => {
    resolve({ message: 'event listener started' });
    startSQS(listener);
  });
}

export function stop() {
  return new Promise((resolve, reject) => {
    resolve({ message: 'event listener stopped' });
    stopSQS();
  });
}
