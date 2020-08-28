
const { MongoClient } = require('mongodb');
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
    const existingEmail = await client
      .db('usersdb')
      .collection('users')
      .findOne({ email_address: user.email })

    if (existingEmail == null) {
      await client.connect();
      const result = await client
        .db('usersdb')
        .collection('users')
        .insertOne({ email_address: user.email, password: user.password, first_name: user.name, last_name: user.surname, vacation_days: 0, plans: [] });
      console.log(result);  
      return result.ops[0];
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
    await client.close();
  }
}

exports.handler = async function (event, context) {
  try {
    const data = await getData(JSON.parse(event.body));
    if (data !== null) {
      const { email_address, first_name, last_name, _id, plans } = data;
      return {
        statusCode: 200,
        body: JSON.stringify({ _id, email_address, first_name, last_name, plans })
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