# Search Ingest

This micro-service is designed to manage the ingestion of data from a SQS event queue into Elasticsearch. It has some main responsibilities:

1. Setup of an Elasticsearch index including mapping. (the mappings are built into this microservice)
1. Mass migration of data from the db into an index.
1. Incremental updates of documents in the index when the db is updated.
1. Switching migration/updates off and on.

###  Setup of an Elasticsearch index including mapping
``/indices/<index>/_create`` will create an index.
``/indices/<index>/_delete`` will delete an index.


###  Bulk ingestion to initialise the Elasticsearch cluster
``/ingestion/bulk/_start?index=<name>&bucketkey=<name of file in s3>&type=<index type>`` will ingest from the content db using slugs from S3 in a file named <bucketkey> into index <index> with type <type>. However, these slugs are incredibly secret, so they should not be publicly accessible.

possible values for bucketkey are whatever the file is named in s3. defaults to slugs.txt. This file much be a new-line separated file of valid slugs.

``/ingestion/bulk/_stop`` will stop any ingestion that is occurring.
Currently only one ingestion can be in process at any time.

###  Event-driven, incremental ingestion to update the Elasticsearch cluster
``/ingestion/events/_start`` will start the event listener. The listener will be listening to event coming off an SQS queue. This needs to be up and running.

``/ingestion/events/_stop`` will pause the incremental ingestion.
