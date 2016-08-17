let environment = 'development';
if (process.env.NODE_ENV === 'production') {
  environment = 'production';
}
const isProduction = environment === 'production';

export const CONFIG = {
  env: environment,
  port: process.env.NODE_PORT || 6868,
  IS_PROD: isProduction,
  ES_URL: 'https://search-content-dev-dmvcnergxcmxccwxecwwvczbwq.eu-west-1.es.amazonaws.com',
  SQS_URL: 'https://sqs.eu-west-1.amazonaws.com/574347931884/listing-trigger-dev',
  S3_BUCKET: 'dojo-search-ingest',
  DB_LISTING_URLS: {
    london: 'http://dojo-master-api-development.eu-west-1.elasticbeanstalk.com/web/v1-0/LON/listings/',
    paris: 'http://dojo-master-api-development.eu-west-1.elasticbeanstalk.com/web/v1-0/PAR/listings/'
  }
};
