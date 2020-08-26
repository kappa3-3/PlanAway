const unirest = require('unirest');

const key = process.env.SKYSCANNER_KEY;

async function getData(info) {
  try {
    const {
      departureDate, returnDate, fromPlaceId, toPlaceId,
    } = info;
    const req = unirest("GET", `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/NL/EUR/en-GB/${fromPlaceId}/${toPlaceId}/${departureDate}/${returnDate}`);

    req.headers({
      "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
      'x-rapidapi-key': key,
      useQueryString: true,
    });

    req.end((res) => res.body);
    const data = await req;

    return data.body;
  } catch (err) {
    throw (err.message);
  }
}

exports.handler = async function (event) {
  console.log(event.body);
  try {
    const destinations = await getData(JSON.parse(event.body));
    return {
      statusCode: 200,
      body: JSON.stringify(destinations),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }),
    };
  }
};
