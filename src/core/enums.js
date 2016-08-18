import mirror from 'key-mirror';
export const indexes = ['london', 'paris'];

export const bulkIngestDefaults = {
  bucketkey: 'slugs.txt',
  index: 'london',
  type: 'listingContext'
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
