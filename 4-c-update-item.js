var AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json');

console.log('4c - Update Item (DELETE)');

var ddb = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});

var params = {
  TableName: 'CUSTOMER_ENQUIRIES',
  Key: {
    'CUSTOMER_REF': '9999999999',
    'DATE': '20191009195231'
  },
  UpdateExpression: "DELETE #tags :tags",
  ExpressionAttributeNames: {
    '#tags' : "TAGS"
  },
  ExpressionAttributeValues: {
    ':tags' : ddb.createSet(['high-priority'])
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
