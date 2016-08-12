# Dojo Search Ingest

This micro-service is designed to ingest data from the content database and put it into Elasticsearch.

It has 4 main jobs.

1. Setup of an Elasticsearch index including mapping.
1. Mass migration of data into an index.
1. Incremental updates of documents in the index.
1. Reindexing the elastic search index with zero downtime.
