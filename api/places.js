const unirest = require('unirest');

const key = process.env.SKYSCANNER_KEY;

async function getPlace(place) {
  try {
    const req = unirest('GET', 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/NL/EUR/en-GB/');

    req.query({
      query: place,
    });

    req.headers({
      'x-rapidapi-host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com',
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
  try {
    const places = await getPlace(event.body);
    return {
      statusCode: 200,
      body: JSON.stringify(places),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }),
    };
  }
};
