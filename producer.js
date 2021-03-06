var { SQS } = require('aws-sdk');
const endpoint =  'https://sqs.us-east-1.amazonaws.com/';
const sqsClient = new SQS({
  region: 'us-east-1'
});

exports.handler =  async function(event, context, callback) {
  var accountId = context.invokedFunctionArn.split(":")[4];
  var queueUrl = endpoint + accountId + '/TrainingQueue';
  // response and status of HTTP endpoint
  var responseBody = {
    message: ''
  };
  var responseCode = 200;
  // SQS message parameters
  const params = {
    MessageBody: event.body,
    QueueUrl: queueUrl
  };
  try {
    const responseBody = await sqsClient.sendMessage(params).promise();
    console.log(responseBody);
    var response = {
      statusCode: responseCode,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(responseBody)
    };
    callback(null, response);
    
  } catch (error) {
    callback(null, error);
    console.log('error:', "failed to send message" + error);
    var responseCode = 500;
  }
}