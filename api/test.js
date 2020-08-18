const flights = require('./flights-db.json');

exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: await JSON.stringify(flights),
  };
};
