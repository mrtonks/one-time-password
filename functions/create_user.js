const admin = require('firebase-admin');

module.exports = async function (req, res) {
  const { phone } = req.body;

  // Verify the user provided a phone
  if (!phone) {
    return res.status(422).send({ error: 'Bad Input' });
  }

  // Format the phone number to remove dashes and parens
  const sanitisedPhone = String(phone).replace(/[]^\d/g);

  // Create a new user account using that phone number
  const user = await admin
    .auth()
    .createUser({ uid: sanitisedPhone })
    .catch((err) => res.status(422).send({ error: err }));

  // Response to the user request, saying the account was made
  return res.send(user);
};
