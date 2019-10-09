var AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json');

console.log('1c - Describe tables');


// Create the DynamoDB service object
var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

var params = {
  TableName: 'CUSTOMER_ENQUIRIES'
};

// Call DynamoDB to retrieve the list of tables
ddb.describeTable(params, function(err, data) {
  if (err) {
    console.log("Error", err.code);
  } else {
    console.log("Table: ", data);
  }
});

