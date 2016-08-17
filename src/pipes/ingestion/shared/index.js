import winston from 'winston';
import { requestListingContext } from '../../../services/content-db';
import { postToIndex } from '../../../services/elasticsearch';

export function requestAndIndex({ config, slug, id }) {
  if (config.type === 'listingContext') {
    return requestAndIndexListingContext({ config, slug, id });
  }
  return Promise.reject(new Error('no config type to map to'));
}

function requestAndIndexListingContext({ config, slug, id }) {
  return new Promise((resolve, reject) => {
    requestListingContext(config, slug).then((result) => {
      postToIndex(config, result, id).then((result) => {
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
