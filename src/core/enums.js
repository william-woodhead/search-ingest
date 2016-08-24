import mirror from 'key-mirror';
export const indexes = ['public', 'private'];

export const bulkIngestDefaults = {
  bucketkey: 'slugs.txt',
  index: 'public',
  type: 'users'
};

export const EVENTS = mirror({
  ITERATOR_RELEASE: null,
  METHOD_CREATE: null,
  METHOD_UPDATE: null,
  RESPONSE_FROM_ES: null,
  RESPONSE_FROM_DB: null,
  PARSE_SQS: null,
  BULK_INGEST: null,
  ERROR: null,
  DOCUMENT_INDEXED: null,
  BULK_INGEST_STOP: null
});
