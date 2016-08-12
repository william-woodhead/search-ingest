let environment = 'development';
if (process.env.NODE_ENV === 'production') {
  environment = 'production';
}
const isProduction = environment === 'production';

export const CONFIG = {
  env: environment,
  port: process.env.NODE_PORT || 6868
};
