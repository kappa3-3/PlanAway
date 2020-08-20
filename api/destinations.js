/* eslint-disable */
const unirest = require("unirest");
const key = process.env.SKYSCANNER_KEY;

async function getData(info) {
  try {
    const { departureDate, returnDate, from, to } = info;
    const req = unirest("GET", `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/NL/EUR/en-GB/${from}/${to}/${departureDate}`);

    req.query({
      "inboundpartialdate": returnDate
    });

    req.headers({
      "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
      "x-rapidapi-key": "0a9d8fee31mshb9a45a4689f1692p1a5e90jsn742192a63408",
      "useQueryString": true
    });

    req.end(function (res) {
      return (res.body);
    });

    const data = await req;
    return data.body;
  } catch (err) {
    throw new Error(res.error);
  }
}

exports.handler = async function (event, context) {
  try {
    const destinations = await getData(JSON.parse(event.body));
    if (destinations !== null) {
      return {
        statusCode: 200,
        body: JSON.stringify(destinations)
      };
    } else {
      return {
        statusCode: 200,
        body: JSON.stringify(destinations)
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