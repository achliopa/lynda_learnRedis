import Redis from 'ioredis';
import Strings from './strings';
import Hashes from './hashes';
import Lists from './lists';
import Sets from './sets';
import Sorted from './sorted';

const redis = new Redis({password: 'rootroot'});

// Strings(redis);
// Hashes(redis);
// Lists(redis);
// Sets(redis);
Sorted(redis);