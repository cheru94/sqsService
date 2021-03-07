var { SQS } = require('aws-sdk');
module.exports = new SQS({
  region: process.env.REGION
});
