import { S3 } from '../../clients/s3';

export function getSlugs() {
  const s3 = new S3();
  const client = s3.getClient();
  return new Promise((resolve, reject) => {
    client.getObject({Bucket: 'dojo-search-ingest', Key: 'slugs_12082016.txt'}, (err, data) => {
      if (err) {
        return reject(err);
      }
      resolve(data.Body.toString().split('\n').slice(1000, 4000));
    });
  });
}
