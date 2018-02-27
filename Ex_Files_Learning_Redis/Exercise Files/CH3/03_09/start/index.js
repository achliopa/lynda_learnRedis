import Redis from 'ioredis';
import Strings from './strings';
import Hashes from './hashes';
import Lists from './Lists';
import Sets from './sets';

const redis = new Redis({ password: 'man3294ehd'});

Strings(redis);
Hashes(redis);
Lists(redis);
Sets(redis);
