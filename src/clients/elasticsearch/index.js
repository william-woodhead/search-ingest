import ElasticSearch from 'elasticsearch';
import { CONFIG } from '../../config';

const config = {
  hosts: 'https://search-content-dev-dmvcnergxcmxccwxecwwvczbwq.eu-west-1.es.amazonaws.com',
  log: !CONFIG.IS_PROD ? 'error': 'trace',
  connectionClass: require('http-aws-es'),
  amazonES: {
    region: 'eu-west-1',
    accessKey: process.env.AWS_ACCESS_KEY_ID,
    secretKey: process.env.AWS_SECRET_ACCESS_KEY
  }
}

let singleton;

export class Elasticsearch {
  constructor() {
    if (singleton) {
      return singleton;
    }

    if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
      throw new Error('No access credentials');
      return;
    }

    this.elasticsearch = ElasticSearch.Client(config);
    singleton = this;
  }

  getClient() {
    return this.elasticsearch;
  }
}
