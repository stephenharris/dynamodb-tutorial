
# Storing Items

In DynamoDB every item is uniquely identified by its primary key. Recall that the primary key might a single attribute, or a pair of attributes.

Creating and replacing items is both done using the `PUT` command, and when doing so the only attributes you must provide are primary key.

(Attributes used in seconary indexes are not required, and do not have to unique to an item).

An item is specified as mapping of attributes to attribute-value-objects. These attribute-value-objects consist of a type and value pairing. Under the hood, the value is always given as a string. For example:

    {
        'CUSTOMER_REF' : {S: '9999999999'},
        'DATE' : {S: '20191009195231'},
        'TYPE' : {S: 'REFUND'},
        'STATUS' : {S: 'OPEN'},
        'AMOUNT': {N: '2700'}	
    }

**Imporant:** In the code examples, we're now using `AWS.DynamoDB.DocumentClient` instead of `AWS.DynamoDB`. This provides a higher-level interface to work with which simplifies things for us, including marshalling the attribute types from the native JavaScript type. So when using `AWS.DynamoDB.DocumentClient` we specify number values as numbers

Inspect `2-a-put-item.js`, in these we specify `CUSTOMER_REF` and `DATE` attributes, alongside some other attributes. 

Note:

 1. If we ommit either primary key attribute we get an error
 2. If we change the status (or another non-key attribute) it replaces the item
 3. If we change the type of the primary key attributes (`CUSTOMER_REF` or `DATE`) to a number we get an error, but we don't get an error if we change the type of any other attribute.
 4. If we add / remove any non-key attribute the item is succesfully added/replaced

Recall that no-sql is schema-less. So non-primary key attributes might have different types, or not exist all.

It's common - [and recommended](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/bp-general-nosql-design.html) - to have only one table per application, and to store different entities in the same table.

