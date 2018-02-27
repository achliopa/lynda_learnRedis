import Redis from 'ioredis';
import Strings from './strings';
import Hashes from './hashes';

const redis = new Redis({ password: 'man3294ehd'});

Strings(redis);
Hashes(redis);

