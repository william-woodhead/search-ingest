import winston from 'winston';
import { requestAndIndex } from '../../shared';
import { getListingContexts } from '../../../../services/elasticsearch';
import size from 'lodash/size';
import forEach from 'lodash/forEach';

export function listingContextPipe(attrs) {
  switch(attrs.method) {
    case 'CREATE':
      return createHandler(attrs);
    case 'DELETE':
      return deleteHandler(attrs);
    case 'UPDATE':
    default:
      return updateHandler(attrs);
  }
}

function createHandler(attrs) {
  forEach(attrs.slugs, (slug) => {
    requestAndIndex(slug);
  });
}

function deleteHandler() {
  // cannot delete yet
}

function updateHandler(attrs) {
  forEach(attrs.slugs, (slug) => {
    getListingContexts(slug).then((result) => {
      const id = result && result.hits && result.hits.hits && result.hits.hits[0] && result.hits.hits[0]._id ? result.hits.hits[0]._id : undefined;
      if (!id) winston.log('error', `cant find document to update for slug: ${slug} - This action might be creating a duplicate listingContext`);
      requestAndIndex(slug, id);
    }).catch((err) => {
      winston.log('error', err);
    });
  });
}
