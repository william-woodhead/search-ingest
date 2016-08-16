import { S3 } from '../../clients/s3';
import { CONFIG } from '../../config';

export function getSlugs() {
  const s3 = new S3();
  const client = s3.getClient();
  return new Promise((resolve, reject) => {
    client.getObject({Bucket: CONFIG.S3_BUCKET, Key: CONFIG.S3_KEY }, (err, data) => {
      if (err) {
        return reject(err);
      }
      resolve(data.Body.toString().split('\n'));
    });
  });
}
