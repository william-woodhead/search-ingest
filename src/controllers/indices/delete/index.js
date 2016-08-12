import { Elasticsearch } from '../../../core/elasticsearch';

export function deleteIndex({name}) {
  return new Promise((resolve, reject) => {
    const elasticsearch = new Elasticsearch();
    const client = elasticsearch.getClient();

    client.indices.delete({
      requestTimeout: 30000,
      index: name
    }).then((response) => {
      resolve(response);
    }).catch((err) => {
      reject(err);
    });
  });
}
