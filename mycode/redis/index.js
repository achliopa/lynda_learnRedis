import Redis from 'ioredis';

const redis = new Redis({password: 'rootroot'});

redis.set('name', 'thanasis');
redis.get('name', (err, result) => {
	console.log(result);
});