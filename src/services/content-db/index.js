import superagent from 'superagent';
import { CONFIG } from '../../config';

export function requestListingContext(config = {}, slug = '') {
  return new Promise((resolve, reject) => {
    if (!slug) return reject(new Error('No slug string'));
    superagent.get(`${CONFIG.DB_LISTING_URLS[config.index]}${slug}`).end((err, res) => {
      if (err) return reject(err);
      resolve(res.body.listing);
    });
  });
}
