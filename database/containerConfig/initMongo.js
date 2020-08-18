/* global db */
const {v4: uuidv4} = require('uuid');

db.createUser(
  {
    user: 'Dodo',
    pwd: 'DodoMob',
    roles: [
      {
        role: 'readWrite',
        db: 'usersdb',
      },
    ],
  },
);

// Create seed data here
// This is an example
db.createCollection('users');
db.users.insert({
  id: uuidv4(),
  first_name: 'Marcus',
  last_name: 'Scott',
  vacation_days: 25,
  email_address: 'marcus_scott@gmailify.com'
});
