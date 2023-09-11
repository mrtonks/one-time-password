/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const admin = require('firebase-admin');
const { onRequest } = require('firebase-functions/v2/https');
const createUser = require('./create_user');
const serviceAccount = require('./service_account.json');
const requestOneTimePassword = require('./request_one_time_password');
const verifyOneTimePassword = require('./verify_one_time_password');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

exports.createUser = onRequest({ region: 'europe-west1' }, createUser);
exports.requestOneTimePassword = onRequest({ region: 'europe-west1' }, requestOneTimePassword);
exports.verifyOneTimePassword = onRequest({ region: 'europe-west1' }, verifyOneTimePassword);
