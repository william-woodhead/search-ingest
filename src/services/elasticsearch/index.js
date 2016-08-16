import { Elasticsearch } from '../../clients/elasticsearch';
import { mappings } from './mapping';
const elasticsearch = new Elasticsearch();
const client = elasticsearch.getClient();
const index = 'london';
const type = 'listingContexts';

export function createIndex({ name }) {
  return new Promise((resolve, reject) => {
    client.indices.create({
      requestTimeout: 30000,
      index: name,
      body: { mappings }
    }).then((response) => {
      resolve(response);
    }).catch((err) => {
      reject(err);
    });
  });
}

export function deleteIndex({ name }) {
  return new Promise((resolve, reject) => {
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

export function postToIndex(body, id) {
  return new Promise((resolve, reject) => {
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
