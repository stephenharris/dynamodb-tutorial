
# Getting an item

You can only get an item by its primary key. If your table has a secondary index, you cannot get an item by its secondary key (there is no uniqueness requirement for secondary keys).

Inspect `3-a-get-item.js` and run it to retrieve the item we created in the last section.

Note:

 1. If we change the type of the primary key attributes the script errors
 2. Getting an item which doesn't exist is not an error

## Projection expressions

Projection expressions allow us to retrieve only certain attributes from the database.

These simplifies your client application as it does not have to extract the properties its interested in itself. It also saves you on network traffic between your app and DynamoDB.

**It does not reduce your Read Capacit Units**. These are calculated on the amount of KB retrieved from a database. If you had 13KB item in the database, but only needed one attribute, that will still cost 2 RCU.

Uncomment lines 15-18 and observe what we get back when you run `3-a-get-item.js`

Notice that we when requesting `TYPE` we used the `#type` placholder. If you replace `#type` with `TYPE` you'll get the error

> Attribute name is a reserved keyword; reserved keyword: TYPE

DynamoDB has a long list of [reserved words](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/ReservedWords.html), to get round this we use **expression attribute names** as placeholders. We then tell DynamoDB what the name refers to via `ExpressionAttributeNames`.