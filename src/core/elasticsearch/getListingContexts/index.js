import { Elasticsearch } from '../../../core/elasticsearch';
import forEach from 'lodash/forEach';

export function getListingContexts(attrs, success, failure) {
  const elasticsearch = new Elasticsearch();
  const client = elasticsearch.getClient();

  forEach(attrs.slugs, (slug) => {
    const query = {
      constant_score: {
        filter: {
          term: {
            slug
          }
        }
      }
    };
    client.search({
      index: 'london',
      type: 'listingContexts',
      body: {
        query
      }
    }).then((result) => {
      success('UPDATE', slug, result);
    }).catch((err) => {
      failure(slug, err);
    });
  });
}
