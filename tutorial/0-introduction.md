
# Getting started

## What is Dynamo DB?

> Amazon DynamoDB is a key-value and document database that delivers single-digit millisecond performance at any scale

(taken from [htps://aws.amazon.com/dynamodb](https://aws.amazon.com/dynamodb))


DynamoDB is a managed no-sql database-as-a-service. AWS automatically handles scaling of throughput and storage.


## Key Concepts

### Tables, Items & Attributes

*Tables* in DynamoDB are similar to tables in MySQL and other relational DBs. They are a collection of *items*. E.g you might have a table called `Enquiries` - which contains all enquiries initiated by your customers.

*Items* in DynamoDB are a record in a database (similar to a row in MySQL) (e.g. an individual enquiry). They consist of a mapping of attribute name to value. However, as with other no-sql databases (and unlike relational databases), they are schema-less. That is, each item in the database can have different attribute names: they are not required to share the same set of attributes. (Except for the *primary key* which we'll cover later).

*Attributes* are akin to columns in relational databases. They have names and data types (Number, String, Bool, Binary and Null). They are the 'properties' of your item (e.g. we might have an attribute `Date` storing the date the enquiry was initiated, or `CustomerRef` attribute specifying the customer who opened the enquiry. As mentioned, though, one item may have a completely different set of attributes to another - with the exception of the *primary key*.

### Primary key

A *primary key* in DynamoDB is similar to a primary key in RDBs. It **uniquely** identifies an item in the database.

Primary keys come in two sorts:

1. A *simple primary key* - The key is composed of one attribute. E.g. `EnquiryId`. You can use this key to look-up a particular item. 

2. A *composite primary key* - of two attributes, which together uniquely identify the item. The first is the 'partition' (or 'hash') key. The second is the 'sort' (or 'range') key. For a given partition key there can multiple items, but these must have unique sort keys. E.g. we could use `CustomerRef` as our partition key, and `Date` as our sort key (assuming we prevent the customer from submitting multiply enquiries at the same time).

It's important to note the following when picking a primary key:

1. All queries on our DynamoDB must be done *within* a partition key. We cannot\* query across partitions. So in the examples above, we could not pull out all 'refund requests', but we could in (2), pull out all enquiries in the last 6 months, associated with a customer.

2. Each item must have the primary key attributes

Unlike other attributes, primary key attributes must be specified at table-creation time.


\*Actually you can, its called *scan* - but you should absolutely never do it.

### Secondary Indices

DynamoDB allows you to add secondary indices to query data more efficiently. These come in two sorts:

1. A *local secondary index* uses the same partition key, but allows you to specify a different sort key. E.g. we might add `Type` as a secondary query to pull out all 'read-dispute' enquiries. 

2. A *global secondary index* allows you to use a different pair of attributes.

Secondary indexes do not have to be unique. However they are some limitations:

1. You cannot 'get' an item by its secondary index (see above)
2. You are limited to 5 local secondary indexes and 20 global secondary indexes per table
3. For tables with local secondary indexes, there is a 10 GB size limit per partition key value.

### Read & Write Capacity Units

With DynamoDB you indicate how much traffic you expect to receive Read Capacity Units (RCUs) and Write Capacity Units (WCUs). 

One RCU represents one strongly consistent read per second, or two eventually consistent reads per second, for an item up to 4 KB in size.

One WCU represents one write per second for an item up to 1 KB in size.

Leaving aside the notions of 'strongly' and 'eventually' consistent, if you wish to read 13KB item from the database, that will cost

    Ceil(13/4)/2 = 2 RCU

If you wanted to write a 2KB item to the database, that would cost

    Ceil(2/1) = 2 WCU

**Important:** If you exceed your W/RCU the traffic will be throttled. You can change the W/RCU limits at any time, or scale them according to demand.



