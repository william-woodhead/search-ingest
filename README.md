# Dojo Search Ingest

This micro-service is designed to ingest data from the content database and put it into Elasticsearch.

It has 4 main jobs.

1. Setup of an Elasticsearch index including mapping.
1. Mass migration of data into an index.
1. Incremental updates of documents in the index.
1. Reindexing the elastic search index with zero downtime.

There are a number of interlinked service.

1. To ingest data, slugs needs to be read from an S3 bucket. However, these slugs are incredibly secret, so they should not be publically accessible.
1. Incremental ingestion is read from an SQS message queue. This needs to be up and running for incremental updates to work.

/ingestion/bulk/_start?index=<index name>&bucketkey=<name of the line separated file of slugs in s3>&type=<type on the index>
