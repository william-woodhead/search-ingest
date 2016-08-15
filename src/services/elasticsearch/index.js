import { Elasticsearch } from '../../clients/elasticsearch';
import forEach from 'lodash/forEach';

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

export function getListingContexts(attrs, success, failure) {
  const elasticsearch = new Elasticsearch();
  const client = elasticsearch.getClient();

  forEach(attrs.slugs, (slug) => {
    const query = { constant_score: { filter: { term: { slug } } } };
    client.search({
      index: 'london',
      type: 'listingContexts',
      body: { query }
    }).then((result) => {
      success('UPDATE', slug, result);
    }).catch((err) => {
      failure(slug, err);
    });
  });
}
