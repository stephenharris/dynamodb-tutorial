var AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json');

console.log('2a - Put Item');

var ddb = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});

var params = {
  TableName: 'CUSTOMER_ENQUIRIES',
  Item: {
    'CUSTOMER_REF' :'9999999999',
    'DATE' : '20191009195231',
    'TYPE' : 'REFUND',
    'STATUS' : 'OPEN',
    'AMOUNT': 2740
  }
};

// Call DynamoDB to add the item to the table
ddb.put(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data);
  }
});

