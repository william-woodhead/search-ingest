export const indexes = ['london', 'paris'];

export const bulkIngestDefaults = {
  bucketkey: 'slugs.txt',
  index: 'london',
  type: 'listingContext'
};

export const EVENTS = {
  ITERATOR_RELEASE: 'ITERATOR_RELEASE',
  METHOD_CREATE: 'METHOD_CREATE',
  METHOD_UPDATE: 'METHOD_UPDATE',
  RESPONSE_FROM_ES: 'RESPONSE_FROM_ES',
  RESPONSE_FROM_DB: 'RESPONSE_FROM_DB',
  PARSE_SQS: 'PARSE_SQS',
  BULK_INGEST: 'BULK_INGEST',
  ERROR: 'ERROR',
  DOCUMENT_INDEXED: 'DOCUMENT_INDEXED',
  BULK_INGEST_STOP: 'BULK_INGEST_STOP'
};
