exports.buildSqsParams = ({event, context}) => {
    const accountId = context.invokedFunctionArn.split(":")[4];
    const endpoint = process.env.ENDPOINT;
    const sqsName = process.env.SQS_NAME;
    const queueUrl  = endpoint + accountId + sqsName;
    return {
        MessageBody: event.body,
        QueueUrl: queueUrl
    };
};
