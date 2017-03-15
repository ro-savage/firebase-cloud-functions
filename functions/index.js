require('@google-cloud/debug-agent').start();
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const fetch = require('node-fetch');
const cors = require('cors')({origin: true});

admin.initializeApp(functions.config().firebase);

exports.reserveTicket = functions.https.onRequest((req, res) => {
  // Grab the text parameter.
  const query = req.query;
  // Push it into the Realtime Database then send a response
  cors(req, res, () => {
    admin.database().ref(`/tickets/${query.eventid}/tickets/${query.ticketid}`).update({available: false, reserved: true }).then(() => {
      res.status(201).json({message: 'Ticket reserved', ticketId: query.ticketid, error: false });
    });
  })
});

exports.purchaseTicket = functions.https.onRequest((req, res) => {

  const query = req.query;

  // fetch('https://us-central1-functions-56eb1.cloudfunctions.net/validatePayment')
  //   .then(response => response.json())
  //   .then(json => confirmedPurchase())
  //

  const confirmedPurchase = () => {
    cors(req, res, () => {
      admin.database().ref(`/tickets/${query.eventid}/tickets/${query.ticketid}`).update({available: false, purchased: true }).then(() => {
        res.status(201).json({message: 'Ticket purchased', ticketId: query.ticketid, error: false });
      })
    })
  }

  confirmedPurchase()
})

// exports.validatePayment = functions.https.onRequest((req, res) => {
//   cors(req, res, () => {
//     res.json({error: false, success: true})
//   })
//   // setTimeout(() => {
//   //   cors(req, res, () => {
//   //     res.json({error: false, success: true})
//   //   })
//   // }, 500)
// })

exports.resetTicket = functions.https.onRequest((req, res) => {
  // Grab the text parameter.
  const query = req.query;
  // Push it into the Realtime Database then send a response
  cors(req, res, () => {
    admin.database().ref(`/tickets/${query.eventid}/tickets/${query.ticketid}`).update({available: true, reserved: false, purchased: false }).then(() => {
      res.status(201).json({message: 'Ticket reset', ticketId: query.ticketid, error: false });
    })
  })
})
