import superagent from 'superagent';
import { CONFIG } from '../../config';

export function requestContent(config = {}) {
  const { slug, index } = config;
  return new Promise((resolve, reject) => {
    if (!slug) return reject(new Error('No slug string'));
    superagent.get(`${CONFIG.DB_URLS[index]}${slug}`).end((err, res) => {
      if (err) return reject(err);
      resolve(res.body.user);
    });
  });
}
