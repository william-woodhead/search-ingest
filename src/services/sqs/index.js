import { SQS } from '../../clients/sqs';
const sqs = new SQS();

export function start(listener) {
  sqs.start();
  sqs.addListener(listener);
}

export function stop() {
  sqs.stop();
}
