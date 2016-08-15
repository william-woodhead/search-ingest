import { Elasticsearch } from '../../core/elasticsearch';

export function postToIndex(listing, id) {
  return new Promise((resolve, reject) => {
    const elasticsearch = new Elasticsearch();
    const client = elasticsearch.getClient();

    const config = {
      index: 'london',
      type: 'listingContexts',
      body: listing
    };

    if (id) config.id = id;

    client.index(config).then((result) => {
      resolve(result);
    }).catch((err) => {
      reject(err);
    });
  });
}
