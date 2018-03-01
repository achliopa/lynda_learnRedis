const Lists = (redis) => {
	redis.ltrim('planets',0, 0);

	redis.rpush('planets', 'venus', 'earth', 'mars', 'jupiter');

	redis.rpush('planets', 'saturn');

	redis.lpush('planets', 'mercury');

	redis.rpop('planets');

	redis.lrange('planets', 0, -1, (error,result) => {
		console.log(result);
	})
}

export default Lists;