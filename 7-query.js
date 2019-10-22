var AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json');

console.log('7 - Get by hash key');

var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

var params = {
    TableName : 'CUSTOMER_LIST',
    KeyConditionExpression : 'CUSTOMER_ID = :id and CUSTOMER_NAME = :name',
    ExpressionAttributeValues : {
        ':id' : {N: '001'},
        ':name': {S: 'Richard Roe'}
    }
};

ddb.query(params, function(err, data) {
    if (err) {
        console.error("Unable to read item. Error JSON:", JSON.stringify(err,
                null, 2));
    } else {
        console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
    }
});
