var AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json');

console.log('6 - Bulk Add');

var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

var params = {
  RequestItems: {
    'CUSTOMER_LIST': [
      {
        PutRequest: {
          Item: {'CUSTOMER_ID': {N: '001'}, 'CUSTOMER_NAME': {S: 'Richard Roe'}, 'AGE': {N: '25'}}
        }
      },
      {
        PutRequest: {
          Item: {'CUSTOMER_ID': {N: '001'}, 'CUSTOMER_NAME': {S: 'Bobby Drop Table'}, 'AGE': {N:'43'}}
        },
      },
      {
        PutRequest: {
          Item: {'CUSTOMER_ID': {N: '002'}, 'CUSTOMER_NAME': {S: 'Clark Kent'}, 'AGE': {N:'23'}}
        }
      }
    ]
  }
};

ddb.batchWriteItem(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    data.Responses.CUSTOMER_LIST.forEach(function(element, index, array) {
      console.log(element);
    });
  }
});
