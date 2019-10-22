var AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json');

console.log('6 - Bulk Add');

var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

var params = {
  RequestItems: {
    'CUSTOMER_LIST': {
      Keys: [
        {'CUSTOMER_ID': {N: '001'}, 'CUSTOMER_NAME': {S: 'Adam Smith'}, 'AGE': {N: '25'}},
        {'CUSTOMER_ID': {N: '001'}, 'CUSTOMER_NAME': {S: 'Bobby Drop Table'}, 'AGE': {N:'43'}},
        {'CUSTOMER_ID': {N: '002'}, 'CUSTOMER_NAME': {S: 'Clark Kent'}, 'AGE': {N:'23'}}
      ],
      ProjectionExpression: 'CUSTOMER_ID, CUSTOMER_NAME, AGE'
    }
  }
};

ddb.batchGetItem(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    data.Responses.TABLE_NAME.forEach(function(element, index, array) {
      console.log(element);
    });
  }
});
