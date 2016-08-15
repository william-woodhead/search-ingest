import { SQS } from '../../../core/sqs';
import map from 'lodash/map';

function listener(message) {
  const attrs = map(message.MessageAttributes, (attr, key) => {
    return { key, value: attr.StringValue };
  });
  console.log(attrs);
}

export function start() {
  return new Promise((resolve, reject) => {
    const sqs = new SQS();
    sqs.start();
    resolve();
    sqs.addListener(listener);
  });
}

export function stop() {
  return new Promise((resolve, reject) => {
    const sqs = new SQS();
    sqs.stop();
    resolve();
  });
}
