/* Amplify Params - DO NOT EDIT
	
Amplify Params - DO NOT EDIT */
const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const child_process = require('child_process')

const s3 = new AWS.S3();

exports.handler = async function (event) {

    var params = {
        Bucket: "digitalequitybucket175953-dev",
        Key: "data.json"
    };

    // var tempFileName = path.join('/tmp', 'new_data.json');
    // var tempFile = fs.createWriteStream(tempFileName);
    // s3.getObject(params).createReadStream().pipe(tempFile);
    s3.getObject(params, function (err, data) {
        if (err) {
            console.error(err.code, "-", err.message);
        }

        fs.writeFile('/tmp/data.json', data.Body, function (err) {
            if (err)
                console.log(err.code, "-", err.message);

        });
    });
    console.log('before')
    child_process.execSync("python3 data_process.py", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(stdout.toString());
    });
    console.log()
    const response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        },
        body: JSON.stringify('Hello from Lambda!')
    };

    return response;
}
