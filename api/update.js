/* eslint-disable */
const { MongoClient, ObjectID } = require('mongodb');
const dbuser = process.env.MONGO_USER;
const password = process.env.MONGO_PASS;
const db = process.env.MONGO_DB;

async function getData(user) {
  const uri = `mongodb+srv://${dbuser}:${password}@pacluster.1truh.mongodb.net/${db}?retryWrites=true&w=majority`;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  try {
    await client.connect();
    const result = await client
      .db('usersdb')
      .collection('users')
      .findOne({ _id : ObjectID(user.id) });
    return result;
  } catch (err) {
    console.log(err);
    await client.close();
  }
}

exports.handler = async function (event, context) {
  console.log(event.body);
  try {
    const data = await getData(JSON.parse(event.body));
    console.log(data);
    if ( data !== null) {
      const {email_address, first_name, last_name, vacation_days, _id, plans} = data;
      return {
        statusCode: 200,
        body: JSON.stringify({_id, email_address, first_name, last_name, vacation_days, plans })
      };
    } else {
      return {
        statusCode: 200,
        body: JSON.stringify(data)
      };
    }   
  } catch (err) {
      console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message })
    };
  }
};