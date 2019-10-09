# DynamoDB Tutorial

This tutorial takes you through the basics of using DynamoDB, focussing on using the NodeJS SDK.

The tutorials themselves can be found in the `tutorial` folder. The corresponding scripts are numbered accordingly, and are found in the root of this repository.

For convenience, included is a `docker-compose` file which will spin up a dockerised DynamoDB service, and build a NodeJS container image. You can, of course, use AWS's actual DynamoDB instead. You will need to provide the endpoint and credentials in `config.json`.

## Initial set up

Install

     docker-compose up --build


## Running the scripts

Running the following should install your table

     docker run -it -v"$PWD:/home/node" -w"/home/node" --network=dynamodb_default --rm --name dynamoclient node:10 node 1-a-create-table.js

Simply replace `1-a-create-table.js` with the desired script name to run the other scripts.

# Resources

 - https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/dynamodb-examples.html
 - https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.NamingRulesDataTypes.html#HowItWorks.DataTypes
 - https://aws.amazon.com/blogs/database/using-sort-keys-to-organize-data-in-amazon-dynamodb/
 - https://aws.amazon.com/blogs/database/resolve-to-follow-amazon-dynamodb-best-practices-in-2019/
 - https://www.dynamodbguide.com
 - https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/bp-general-nosql-design.html
 - [AWS re:Invent 2018: Amazon DynamoDB Deep Dive: Advanced Design Patterns for DynamoDB ](https://www.youtube.com/watch?v=HaEPXoXVf2k)