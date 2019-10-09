var AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json');

console.log('3a - Get Item');

var ddb = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});

var params = {
  TableName: 'CUSTOMER_ENQUIRIES',
  Key: {
    'CUSTOMER_REF': '9999999999',
    'DATE': '20191009195231'
  },
  //Uncomment the lines below to get back only the customer reference and type
  //ProjectionExpression:"CUSTOMER_REF, #type",
  //ExpressionAttributeNames:{
  //    "#type": "TYPE"
  //},
};

// Call DynamoDB to read the item from the table
ddb.get(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data);
  }
});
