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

exports.reserveTicket2g = functions.https.onRequest((req, res) => {
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

exports.resetTicket2g = functions.https.onRequest((req, res) => {
  // Grab the text parameter.
  const query = req.query;
  // Push it into the Realtime Database then send a response
  cors(req, res, () => {
    admin.database().ref(`/tickets/${query.eventid}/tickets/${query.ticketid}`).update({available: true, reserved: false, purchased: false }).then(() => {
      res.status(201).json({message: 'Ticket reset', ticketId: query.ticketid, error: false });
    })
  })
})

exports.superFastWithQuery = functions.https.onRequest((req, res) => {
  res.status(200).json({id: req.query.ticketid });
})

exports.superFast = functions.https.onRequest((req, res) => {
  res.json({fast: 'fast!' });
})


function calcFib(num) {
  console.time('fibonacci');
  const start = new Date()
  const fib = fibonacci(num)
  const end = new Date() - start
  console.timeEnd('fibonacci');
  return { num: num, answer: fib, time: end }
}

function fibonacci(num) {
  if (num <= 1) return 1;

  return fibonacci(num - 1) + fibonacci(num - 2);
}

exports.heavyLoad = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    res.json(calcFib(32))
  })
})
