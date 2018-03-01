const Hashes = (redis) => {
	redis.hmset('user:450','firstName','Jeremy','lastName','Irons');
	redis.hmset('user:450', 'address', 234);
	redis.hincrby('user:450', 'address', 100);
	redis.hgetall('user:450', (err,result) => {
		console.log(result);
	});
}

export default Hashes;