const Strings = (redis) => {
	redis.set('name', 'thanasis', 'EX', 5);
	redis.get('name', (err, result) => {
		console.log(result);

	});
	setTimeout(()=> {
		redis.get('name', (err, result) => {
			console.log(result);

		});
	},6000);

	redis.get('address', (err,result) => {
		console.log(result);
	});
	redis.incrby('address',300);
	redis.get('address',(err,result) => {
		console.log(result);
	});

	redis.mset('street', 'Awesome', 'city', 'San Francisco');
	redis.mget('street','city',(err,result) => {
		console.log(result);
	});
}

export default Strings;