var AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json');

console.log('4d - Update Item (REMOVE)');

var ddb = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});

var params = {
  TableName: 'CUSTOMER_ENQUIRIES',
  Key: {
    'CUSTOMER_REF': '9999999999',
    'DATE': '20191009195231'
  },
  UpdateExpression: "REMOVE #tags, #foobar",
  ExpressionAttributeNames: {
    '#tags' : "TAGS",
    '#foobar' : "FOOBAR",
  },
  ReturnValues: 'ALL_NEW'
};

// Call DynamoDB to read the item from the table
ddb.update(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data);
    console.log("Tags", data.Attributes.TAGS);
  }
});
