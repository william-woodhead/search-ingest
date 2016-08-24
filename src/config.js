let environment = 'development';
if (process.env.NODE_ENV === 'production') {
  environment = 'production';
}
const isProduction = environment === 'production';

export const CONFIG = {
  env: environment,
  port: process.env.NODE_PORT || 6868,
  IS_PROD: isProduction,
  ES_URL: '',
  SQS_URL: '',
  S3_BUCKET: '',
  DB_URLS: {
    public: '',
    private: ''
  }
};
