import { S3 } from '../../clients/s3';
import { CONFIG } from '../../config';

export function getSlugs(config = {}) {
  const s3 = new S3();
  const client = s3.getClient();
  return new Promise((resolve, reject) => {
    client.getObject({Bucket: CONFIG.S3_BUCKET, Key: config.bucketkey }, (err, data) => {
      if (err) return reject(err);
      resolve(data.Body.toString().split('\n'));
    });
  });
}
