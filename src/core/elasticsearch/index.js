import Elasticsearch from 'elasticsearch';

const config = {
  hosts: 'https://search-content-dev-dmvcnergxcmxccwxecwwvczbwq.eu-west-1.es.amazonaws.com',
  log: 'trace',
  connectionClass: require('http-aws-es'),
  amazonES: {
    region: 'eu-west-1',
    accessKey: process.env.AWS_ACCESS_KEY_ID,
    secretKey: process.env.AWS_SECRET_ACCESS_KEY
  }
}

export const elasticsearch = Elasticsearch.Client(config);
