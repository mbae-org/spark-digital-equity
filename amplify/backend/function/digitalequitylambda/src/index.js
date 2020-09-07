/* Amplify Params - DO NOT EDIT
	
Amplify Params - DO NOT EDIT */

exports.handler = async (event) => {
    // TODO implement
    const response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Headers": "Access-Control-Allow-Methods,Origin, X-Requested-With, Content-Type, Accept, Authorization",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT"
        },
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};
