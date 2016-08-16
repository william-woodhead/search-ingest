import winston from 'winston';
import { requestListingContext } from '../../../services/content-db';
import { postToIndex } from '../../../services/elasticsearch';

export function requestAndIndex(slug, id) {
  return new Promise((resolve, reject) => {
    requestListingContext(slug).then((result) => {
      postToIndex(result, id).then((result) => {
        winston.log('info', `listing context ${slug} indexed`);
        return resolve(slug);
      }).catch((err) => {
        winston.log('error', err.stack, { slug });
        return reject(err);
      });
    }).catch((err) => {
      winston.log('error', err.stack, { slug });
      return reject(err);
    });
  });
}
