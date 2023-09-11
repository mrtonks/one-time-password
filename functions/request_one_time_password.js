const admin = require('firebase-admin');
const { getFirestore } = require('firebase-admin/firestore');
const twilio = require('./twilio');

module.exports = async function (req, res) {
  const { phone } = req.body;

  if (!phone) {
    return res.status(422).send({ error: 'You must provide a phone number' });
  }

  const sanitisedPhone = String(phone).replace(/[]^\d/g);

  await admin
    .auth()
    .getUser(sanitisedPhone)
    .catch((err) => res.status(422).send({ error: err }));

  const code = Math.floor(Math.random() * 8999 + 1000);

  twilio.messages.create(
    {
      body: `Your code is ${code}`,
      to: sanitisedPhone,
      from: '+447897034587',
    },
    (err) => {
      if (err) {
        return res.status(422).send({ error: err });
      }

      getFirestore()
        .collection('users')
        .doc(sanitisedPhone)
        .set({ code, codeValid: true })
        .then(() => {
          res.send({ success: true });
        });
    }
  );
};
