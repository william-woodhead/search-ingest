import { createIndex as createESIndex } from '../../../services/elasticsearch';

export function createIndex(config = {}) {
  return new Promise((resolve, reject) => {
    createESIndex(config).then((result) => {
      resolve(result)
    }).catch((err) => {
      reject(err);
    });
  });
}
