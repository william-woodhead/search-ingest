import { Elasticsearch } from '../../core/elasticsearch';

export function postToIndex(listing) {
  return new Promise((resolve, reject) => {
    const elasticsearch = new Elasticsearch();
    const client = elasticsearch.getClient();
    client.index({
      index: 'london',
      type: 'listingContexts',
      body: listing
    }).then((result) => {
      resolve(result);
    }).catch((err) => {
      reject(err);
    });
  });
}
