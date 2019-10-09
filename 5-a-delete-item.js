var AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json');

console.log('5 - Delete Item');

var ddb = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});

var params = {
  TableName: 'CUSTOMER_ENQUIRIES',
  Key: {
    'CUSTOMER_REF': '9999999999',
    'DATE': '20191009195231'
  },
  //uncomment the lines below to conditionally delete the item
  //ConditionExpression: 'AMOUNT < :minamount AND #type = :refund',
  //ExpressionAttributeNames:{
  //    "#type": "TYPE"
  //},
  //ExpressionAttributeValues:{
  //    ":refund": 'REFUND',
  //    ":minamount": 2000
  //},
};

// Call DynamoDB to read the item from the table
ddb.delete(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data.Item);
  }
});
