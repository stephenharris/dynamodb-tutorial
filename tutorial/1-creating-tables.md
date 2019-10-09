
# Creating a DynamoDB Table

Recall that no-sql is schema-less. For the most part, items in your database do not need to share the same attribute. In fact no-sql databases can, and often do, contain multiple different entities.

When you create a table you only need to specify:

 1. Table name
 2. Attributes which form the primary key
 3. The primary key

 **Note:** When picking a name you should consider using an application-specific prefix to avoid naming collisions with other tables on your AWS account/region.

Inspect `1-a-create-table.js` and run it as follows:

    docker run -it -v"$PWD:/home/node" -w"/home/node" --network=dynamodb_default --rm --name dynamoclient node:10 node 1-a-create-table.js

You can use the `listTables` method to list the table

    docker run -it -v"$PWD:/home/node" -w"/home/node" --network=dynamodb_default --rm --name dynamoclient node:10 node 1-b-list-table.js

And `describeTable` describes an individual table:

    docker run -it -v"$PWD:/home/node" -w"/home/node" --network=dynamodb_default --rm --name dynamoclient node:10 node 1-c-describe-table.js

## Attribute value types

When defining the attributes that would form the primary key we had to specify both the name and the value type:

    {
      AttributeName: 'CUSTOMER_REF',
      AttributeType: 'S'
    }

Possible values for `AttributeType` are: `S` - string, `N` - number, `B` - binary, `BOOL` - boolean, `NULL` - null, `L` - list (an ordered collection of values, of any type), `M` - maps, key-value pairs of values, and `SS`/`NS`/`BS` - string/number/boolean sets (an unordered collection of unique values - all of the same scalar type)

## Choosing a primary key

RDBs schemas are typically defined to reflect your entities, with JOINs being used to reflect the relationship between those entities. 

Consider our `Enquiries` example. An enquiry might have a 'natural' unique identifier, such as some sort of reference number. In a RDB we might make that our primary key, or use an auto-increment ID or UUID.

When considering our design in no-sql we might be tempted to consider that as a natural choice for our primary key. However, we can only get an item by its primary key and we can only query within a parition key (e.g queries of the form `GET enquiries WHERE partion_key=value and attribute=othervalue`). So if we used such a reference number or UUID as the primary key, we couldn't get all enquiries by a customer (unless we used secondary indices).

With no-sql databases, the driving decision behind your "schema" (i.e. your primary key) is based on your desired access pattern. So you should not think about what an item in your databse *is* but how you will *access* it.

For example, in our enquries application we might want to support:

 1. A customer viewing all their enquiries, ordered by date
 2. A customer/back-office updating their enquiry
 3. Back-office staff viewing open enquiries/refunds within a specified time-frame.


 (1) & (2) can be readily achieved by using customer reference as the partition key, and date as the sort key (assuming we a customer can't open multiple enquieries at exactly the same time). 

 Another consideration for the parition key is ensuring a uniform through out the table. As the table grows, AWS will seamlessly split the data onto different nodes - each containing a subset of parition keys. Each node will then only be dealing with a subset of queries, and thus improve performance. However, the W/RCU limits are split evenly across the nodes. If one node is accessed more often then the rest, it may it that limit.

 Consider DynamoDB storing a dictionary, and suppose we chose the first letter of the word as the parition key, and the word as the sort value. Suppose further that AWS split our table across 26 nodes, one for each letter, and that we had imposed 26 RCU limit. The 'E' and 'Z' nodes now both get a limit of 1 RCU, but its probably that the 'E' parition will be accessed more frequently than the 'Z', and thus exceed that limit.

 Partitions which a frequently accessed are known as 'hot keys', and you should choose a partition key to avoid them. Using customer reference for our enquiries table makes sense here unless we think a small subset of customers will be responsible for a signficant amount of enquiries.
