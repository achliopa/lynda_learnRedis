const Sets = (redis) => {
	redis.sadd("udemy", "python", "javascript","data analysis","sass");
	redis.smembers('udemy',(error,result) => {
		console.log(result);
	});
	redis.spop('udemy', (error,result) => {
		console.log(result);
	});
	redis.sadd('udemy:python', 'master python', 'python anaconda');
	redis.smembers('udemy:python',(error,result) => {
		console.log(result);
	});
	redis.sunionstore('udemy:python', 'udemy:"data analysis"');
	redis.smembers('udemy:"data analysis"',(error,result) => {
		console.log(result);
	});
}

export default Sets;