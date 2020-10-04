const admin = require("firebase-admin");
const { Storage } = require("@google-cloud/storage");
const functions = require('firebase-functions');
admin.initializeApp();
const db = admin.firestore();
const storage = admin.storage();

exports.uploadFile = functions.https.onCall(async (data, context) => {
    const storage = new Storage();
    const bucket = storage.bucket("digital-equity.appspot.com");
    var fileBuffer = new Buffer(data.file, "base64");
    var file = bucket.file(
        "newDataFile"
    );
    console.log()
    await file.save(fileBuffer, {
        metadata: {
            contentType: data.type,
        }
    });
    return "https://storage.cloud.google.com/digital-equity.appspot.com/newDataFile";

});

exports.signUp = functions.https.onCall(async (data, context) => {
    console.log(data.email);
    console.log(data.password);
    firebase.auth().createUserWithEmailAndPassword(data.email, data.password).then(() => { return console.log("submitted user!") }).catch((error) => {
        // Handle Errors here.
        var errorMessage = error.message;
        console.log(errorMessage);
    });
});