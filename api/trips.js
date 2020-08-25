
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
			.findOne(ObjectID("5f3d170f29896b21db22267b"))
		
		console.log(result)
		return result;
	} catch (err) {
		console.log(err);
		await client.close();
	}
}

exports.handler = async function (event, context) {
	console.log(event)
	const data = await getData(event.body);
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