let environment = 'development';
if (process.env.NODE_ENV === 'production') {
  environment = 'production';
}
const isProduction = environment === 'production';

export const CONFIG = {
  env: environment,
  port: process.env.NODE_PORT || 6868,
  IS_PROD: isProduction,
  DB_LISTING_URL: 'http://dojo-master-api-development.eu-west-1.elasticbeanstalk.com/web/v1-0/LON/listings/'
};
