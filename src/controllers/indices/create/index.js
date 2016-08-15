import { Elasticsearch } from '../../../clients/elasticsearch';
import { mappings } from './mapping';

export function createIndex({name}) {
  return new Promise((resolve, reject) => {
    const elasticsearch = new Elasticsearch();
    const client = elasticsearch.getClient();

    client.indices.create({
      requestTimeout: 30000,
      index: name,
      body: {
        mappings,
      }
    }).then((response) => {
      resolve(response);
    }).catch((err) => {
      reject(err);
    });
  });
}
