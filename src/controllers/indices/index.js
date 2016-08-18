import { createIndex as createESIndex, deleteIndex as deleteESIndex } from '../../services/elasticsearch';
import { indexes } from '../../core/enums';

const ERROR = 'This index name is not one of the possible index names';

export function createIndex(config = {}) {
  return new Promise((resolve, reject) => {
    if (indexes.indexOf(config.name) === -1) {
      return reject(new Error(ERROR));
    }
    createESIndex(config).then((result) => {
      resolve(result);
    }).catch((err) => {
      reject(err);
    });
  });
}

export function deleteIndex(config = {}) {
  return new Promise((resolve, reject) => {
    if (indexes.indexOf(config.name) === -1) {
      return reject(new Error(ERROR));
    }
    deleteESIndex(config).then((result) => {
      resolve(result);
    }).catch((err) => {
      reject(err);
    });
  });
}
