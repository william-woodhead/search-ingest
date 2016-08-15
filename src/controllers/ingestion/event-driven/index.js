import { SQS } from '../../../core/sqs';
import { getListingContexts } from '../../../core/elasticsearch/getListingContexts';
import { requestListingContext } from '../../../services/listing-contexts';
import { postToIndex } from '../../../services/elasticsearch';
import reduce from 'lodash/reduce';
import size from 'lodash/size';
import forEach from 'lodash/forEach';

function successHandler(method, slug, result) {
  const { hits } = result.hits;
  const id = result && result.hits && result.hits.hits && result.hits.hits[0] && result.hits.hits[0]._id ? result.hits.hits[0]._id : undefined;

  if (!id && method === 'UPDATE') {
    console.log('cant find id to update - might be creating a duplicate listingContext');
  }

  requestListingContext(slug).then((result) => {
    postToIndex(result, id).then((result) => {
      winston.log('info', `listing context ${index + 1} of ${array.length}`);
    }).catch((err) => {
      winston.log('error', err, { slug });
    });
  }).catch((err) => {
    winston.log('error', err, { slug });
  });
}

function failureHandler(slug, err) {
  console.log(err);
}

function createHandler(attrs) {
  forEach(attrs.slugs, (slug) => {
    successHandler('CREATE', slug);
  });
}

function deleteHandler() {
  // cannot delete yet
}

function listener(message) {
  const attrs = reduce(message.MessageAttributes, (result, attr, key) => {
    result[key] = attr.StringValue;
    if (key === 'slugs') {
      result[key] = attr.StringValue.split(',');
    }
    return result;
  }, {});

  switch(attrs.method) {
    case 'CREATE':
      return createHandler(attrs);
    case 'DELETE':
      return deleteHandler(attrs, successHandler, failureHandler);
    case 'UPDATE':
    default:
      return getListingContexts(attrs, successHandler, failureHandler);
  }
}

export function start() {
  return new Promise((resolve, reject) => {
    const sqs = new SQS();
    sqs.start();
    resolve();
    sqs.addListener(listener);
  });
}

export function stop() {
  return new Promise((resolve, reject) => {
    const sqs = new SQS();
    sqs.stop();
    resolve();
  });
}
