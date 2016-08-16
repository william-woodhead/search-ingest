import { Elasticsearch } from '../../clients/elasticsearch';

const index = 'london';
const type = 'listingContexts';

export function postToIndex(body, id) {
  return new Promise((resolve, reject) => {
    const elasticsearch = new Elasticsearch();
    const client = elasticsearch.getClient();

    const config = { index, type, body };
    if (id) config.id = id;

    client.index(config).then((result) => {
      resolve(result);
    }).catch((err) => {
      reject(err);
    });
  });
}

export function getListingContexts(slug) {
  return new Promise((resolve, reject) => {
    const elasticsearch = new Elasticsearch();
    const client = elasticsearch.getClient();
    const query = { constant_score: { filter: { term: { slug } } } };
    client.search({
      index,
      type,
      body: { query }
    }).then((result) => {
      resolve(result);
    }).catch((err) => {
      reject(err);
    });
  });
}
