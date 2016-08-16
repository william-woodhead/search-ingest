import Consumer from 'sqs-consumer';
import winston from 'winston';
import AWS from 'aws-sdk';

const queueUrl = 'https://sqs.eu-west-1.amazonaws.com/574347931884/listing-trigger-dev';

AWS.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: 'eu-west-1'
});

let singleton;

export class SQS {
  constructor() {
    if (singleton) {
      return singleton;
    }

    if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
      throw new Error('No access credentials for SQS');
      return;
    }

    this.consumer = Consumer.create({
      queueUrl,
      attributeNames: ['All'],
      messageAttributeNames: ['All'],
      handleMessage: (message, done) => done()
    });

    this.consumer.on('error', (err) => {
      winston.log('error', err);
    });
  }

  addListener(listener) {
    this.consumer
    .removeListener('message_processed', listener)
    .on('message_processed', listener);
  }

  start() {
    this.consumer.start();
  }

  stop() {
    this.consumer.stop();
  }
}
