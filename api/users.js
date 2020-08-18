/* eslint-disable */
const { MongoClient } = require('mongodb');

async function getData() {
  const uri =
    `mongodb+srv://DodosMob:dodomobpass1@pacluster.1truh.mongodb.net/usersdb?retryWrites=true&w=majority`;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  try {
    await client.connect();
    const test = await client
      .db('usersdb')
      .collection('users')
      .findOne({ first_name: 'Marcus' });
    return test;
  } catch (err) {
    console.log(err); // output to netlify function log
  } finally {
    await client.close();
  }
}

exports.handler = async function (event, context) {
  try {
    const data = await getData();
    return {
      statusCode: 200,
      body: JSON.stringify({ id: data._id })
    };
  } catch (err) {
    console.log(err); // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message })
    };
  }
};