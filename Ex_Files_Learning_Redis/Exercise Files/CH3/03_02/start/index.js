import Redis from 'ioredis';

const redis = new Redis({ password: 'man3294ehd'});

redis.set('name', 'Emmanuel');
redis.get('name', (err, result) => {
    console.log(result);
});