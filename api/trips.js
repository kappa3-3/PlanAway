
const { MongoClient, ObjectID } = require('mongodb');
const dbuser = process.env.MONGO_USER;
const password = process.env.MONGO_PASS;
const db = process.env.MONGO_DB;

async function getData(trip) {
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
			.updateOne(
				{ _id : ObjectID(trip.id) },
				{$push: { 
					plans: {
						name: trip.name, 
						flights: trip.flights
					}
				}},
		 )
		 const { matchedCount, modifiedCount } = result;
		return ({ matchedCount, modifiedCount});
	} catch (err) {
		console.log(err);
		await client.close();
	}
}

exports.handler = async function (event, context) {
	const data = await getData(JSON.parse(event.body));
	return {
		statusCode: 200,
		body: JSON.stringify(data)
	};
	//   try {
	//     const data = await getData(JSON.parse(event.body));
	//     if ( data !== null) {
	//       const { plans } = data;
	//       return {
	//         statusCode: 200,
	//         body: JSON.stringify({ plans })
	//       };
	//     } else {
	//       return {
	//         statusCode: 200,
	//         body: JSON.stringify(data)
	//       };
	//     }   
	//   } catch (err) {
	//       console.log(err);
	//     return {
	//       statusCode: 500,
	//       body: JSON.stringify({ msg: err.message })
	//     };
	//   }
};