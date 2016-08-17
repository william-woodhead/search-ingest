import { Elasticsearch } from '../../clients/elasticsearch';
import { mappings } from './mapping';
const elasticsearch = new Elasticsearch();
const client = elasticsearch.getClient();

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

export function postToIndex({ index, type }, body, id) {
  return new Promise((resolve, reject) => {
    const params = { index, type, body };
    if (id) params.id = id;

    client.index(params).then((result) => {
      resolve(result);
    }).catch((err) => {
      reject(err);
    });
  });
}

export function getListingContexts(config = {}, slug) {
  return new Promise((resolve, reject) => {
    const query = { constant_score: { filter: { term: { slug } } } };
    client.search({
      index: config.index,
      type: config.type,
      body: { query }
    }).then((result) => {
      resolve(result);
    }).catch((err) => {
      reject(err);
    });
  });
}
