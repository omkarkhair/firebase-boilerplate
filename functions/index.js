const functions = require('firebase-functions');
const firebase = require("firebase");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
const express = require('express');
const cors = require('cors');

var config = {
    apiKey: "AIzaSyA3ClkpPI2Fsl-houXFZmls_eqUCBPOrpg",
    authDomain: "beep-c54a3.firebaseapp.com",
    databaseURL: "https://beep-c54a3.firebaseio.com",
    projectId: "beep-c54a3",
    storageBucket: "beep-c54a3.appspot.com",
    messagingSenderId: "356020273461"
};
firebase.initializeApp(config);
var db = firebase.firestore();
// Disable deprecated features
db.settings({
    timestampsInSnapshots: true
});

const app = express();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

// Add middleware to authenticate requests
// app.use(myMiddleware);

// build multiple CRUD interfaces:
app.get('/set', (req, res) => {
    let user = req.query.user;
    let rate = req.query.rate;
    let timestamp = req.query.timestamp;
    let beat = {
        rate: rate,
        timestamp, timestamp
    };
    // Add a new document in collection "cities"
    db.collection("beat").doc(user).set(beat)
    .then(function() {
        res.json(beat);
    })
    .catch(function(error) {
        res.json({
            error: "Error while writing heartbeat."
        });
    });
});

// Expose Express API as a single Cloud Function:
exports.beats = functions.https.onRequest(app);

exports.createProfile = functions.auth.on