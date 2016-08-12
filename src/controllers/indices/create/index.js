import { elasticsearch } from '../../../core/elasticsearch';

export function create() {
  return new Promise((resolve, reject) => {
    elasticsearch.ping({
      requestTimeout: 30000,
      hello: "elasticsearch"
    }, (error) => {
      if (error) {
        console.log(error);
        return reject(new Error('elasticsearch cluster is down!'));
      }
      resolve('elasticsearch cluster is up and well');
    });
  });
}
