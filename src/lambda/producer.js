const {buildSqsParams} = require('../utils/sqs.utils');
const sqsClient = require('../infrastructure/sqsClient');

exports.handler =  async (event, context, callback) => {
  const params = buildSqsParams({event, context});
  try {
    const responseSqs = await sqsClient.sendMessage(params).promise();
    console.info(responseSqs);
    const response = {
      statusCode: responseCode,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(responseSqs)
    };
    callback(null, response);
    
  } catch (error) {
    callback(null, error);
    console.error('error:', "failed to send message" + error);
  }
}