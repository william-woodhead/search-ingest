import { createIndex as createESIndex } from '../../../services/elasticsearch';
import { indexes } from '../../../core/enums';

export function createIndex(config = {}) {
  return new Promise((resolve, reject) => {
    if (indexes.indexOf(config.name) === -1) {
      return reject(new Error('This index name is not one of the possible index names'));
    }
    createESIndex(config).then((result) => {
      resolve(result);
    }).catch((err) => {
      reject(err);
    });
  });
}
