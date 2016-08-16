import { deleteIndex as deleteESIndex } from '../../../services/elasticsearch';

export function deleteIndex(config = {}) {
  return new Promise((resolve, reject) => {
    deleteESIndex(config).then((result) => {
      resolve(result)
    }).catch((err) => {
      reject(err);
    });
  });
}
