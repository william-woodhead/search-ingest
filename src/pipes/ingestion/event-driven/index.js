import winston from 'winston';
import { sqsMessageToObj } from '../../../utils';
import { requestListingContext } from '../../../services/content-db';
import { postToIndex, getListingContexts } from '../../../services/elasticsearch';
import size from 'lodash/size';
import forEach from 'lodash/forEach';

export function listener(message) {
  const attrs = sqsMessageToObj(message);
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

function requestAndIndex(slug, id) {
  requestListingContext(slug).then((result) => {
    postToIndex(result, id).then((result) => {
      winston.log('info', `listing context ${slug} indexed`);
    }).catch((err) => {
      winston.log('error', err.stack, { slug });
    });
  }).catch((err) => {
    winston.log('error', err.stack, { slug });
  });
}
