const { initParseRuntime } = require("csvtojson/v2/ParseRuntime");
/* eslint-disable promise/always-return */
const admin = require("firebase-admin");
const functions = require("firebase-functions");
import { storage } from "../src/firebase/initParseRuntime.js";

const db = admin.firestore();

const arrayUnion = admin.firestore.FieldValue.arrayUnion;

module.exports.uploadFile = functions.https.onCall(async (data) => {
    // if (!context.auth) {
    //     return { message: "Authentication Required!", code: 401 };
    // }
    const file = data.file;
    const storageRef = storage.ref();
    const fileRef = storageRef.child(file.name);
    // eslint-disable-next-line promise/catch-or-return
    fileRef.put(file).then(() => { console.log("uploaded") });
    return data.file;
});

// createDevpost(name: "Hello", detail: "123")
