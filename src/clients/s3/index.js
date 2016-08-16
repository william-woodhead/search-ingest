import AWS from 'aws-sdk';

const config = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
}

let singleton;

export class S3 {
  constructor() {
    if (singleton) {
      return singleton;
    }

    if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
      throw new Error('No access credentials for S3 access');
      return;
    }

    this.s3 = new AWS.S3(config);
    singleton = this;
  }

  getClient() {
    return this.s3;
  }
}
