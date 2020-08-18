const fs = require('fs');
const flights = require('./flights-db.json');

exports.handler = async (event, context) => {
  const flightsData = await fs.readFile(flights, (err, data) => {
    if (err) throw err;
    return JSON.parse(data);
  });
  console.log('event is ', event);
  console.log('context is ', context);
  return {
    statusCode: 200,
    body: flightsData,
  };
};
