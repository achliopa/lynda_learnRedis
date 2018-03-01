# Lynda.com Course: Learning Redis

## Introduction

* we write ES6 syntax so we need babel
* tutor says to copy reis config files in redis installation

## Section 1 - Setting Up

### Install Redis

* cd tools folder
* wget http://download.redis.io/redis-stable.tar.gz
* tar xvzf redis-stable.tar.gz
* cd redis-stable
* make
* sudo make install
* $: /redis-server to run the server
* $: /rediss-cli to run the clinet(with the server started)
* redis listens in port 6379
* we set/get a key in the db with name = name and value "sakis"

```
127.0.0.1:6379> set name sakis
OK
127.0.0.1:6379> get name
"sakis"
127.0.0.1:6379> 

```

### Setting Up Redis with ioredis


* we can test our db with redis-cli or with ioredis a node based client
* we will use a folder redis. we mkdir and cd redis
* we npm init
* we install babel: npm install --save-dev babel-cli babel-preset-env babel-preset-stage-0
* babel-preset-stage-0 is used for cutting edge JS like ES7
* we install our production dependencies ioredis and nodemon: npm install --save ioredis nodemon
* we write our start script in package.json `"start": "nodemon ./index.js --exec babel-node -e js"` starting index.js with nodemon and using babel 
* we add .babelrc in project root folder putting there

```
{
	"presets": [
		"env",
		"stage-0"
	]
}
```

* the lines above set presets which were installed as npm to support ES6 and ES7 syntax
* we add index.js in our folder for our js code
* we import 'ioredis'
* we instanciate ioredis and set a key valu pair and retrieve it with get/set
* get is async and returns a callback

```
redis.set('name', 'thanasis');
redis.get('name', (err, result) => {
	console.log(result);
});
```

* we test again with server-cli and get the new value

### Overview of client tools

* in redis.io => clients there are clients for every language

## Section 2 - Introduction to Redis Basics

### Introduction to Redis

* redis is inmemory data store
* it supports strings,hashes, lists, sets, sorted sets bitmaps, hyperlogs, geospatioal indexes
* it has high availability, replication and auto partitioning

### Data Types available

* key: the name of the propery
* string: a typical string value
* list: a list of ordered strings (e.g. 2,12,56,45..) 
* hashes: similar to objects, with an object key, then field-value pairs
* set: a list of unordered and unique strings
* sorted set: a list of user-defined ordered unique strings

### Redis Persistence Explained

* Data is saved to memory for fast access
* Two options available
	* Redis Database File (RDB)
	* Append-Only file (AOF)
* AOF uses logs to rebuild the dataset
* RDB is like taking snapshots, creating point-in-time copies of the data
* RDB is the default

### Setting up persistence

* The best strategy is to use AOF for its speed and availability and RDB for its disaster recovery features.
* we open redis.conf in redis installation folder
* we go to SNAPSHOTTING section and search current options.

```
save 900 1
save 300 10
save 60 10000
```

* the above are save DB config after x seconds eg 900) if the number of keys (eg 1) changed. these are RDB optios
* then we search for AOF options (APPEND ONLY MODE)
* by default aof is disabled. we enable it with `appendonly yes` 
* we copy hte path to redis installation folder
* we restart the sever passing the complete path to the redis.conf file e.g `redis-server ~/redis.conf`
* redis creates a file *appendonly.aof* in the folder where we run our command.
* this file takes all transactions and logs them to rebuild the db

### Setting up Replication

* we copy our redis.conf file from redis installation folder and paste it to another folder (e.g desktop) changing its name (e.g redis2.conf) and bring it back to the installation directory

* we open the file  and search for the port definition. we want give another port number to use it  to launch a second server used as replication. we change the port to 6380.
* then we search for *slaveof* in the conf file . it is in REPLICATION section
* we uncomment it , set the ip to the localhost ip of both servers (in a true replication scenario this would be the ip of the primary master server) and as port the port of the master server  (6379)
* to avoid overwrites we rename the apendonly file in the redis2.conf file of the slave server.  `appendfilename "appendonly2.aof"`
* we start the  second server passing the second conf file from the install ation directory
* we see the resplication has started  with both servers running

### Redis further configuration

* if we want to do quick configurations without restarting the server we do them in redis-cli using the command *CONFIG SET*
* these changes will be lost once we reboot he server.
* to make the changes persistent we need to change the config file
* we test in cli `127.0.0.1:6379> CONFIG SET SAVE "60 1"` we use doublequote for string in cli
* we will add password security in config and cli
* in the master server redis.conf file we uncomment requirepass and add our password
* in the slave server redis2.conf file we uncomment `masterauth <master-password>`
and enter the master server password
* we restart both servers
* with the authentication enabled we cannot use the cli without setting password. we need to start the cli with authentication passin the password: `redis-cli -a <mypassword>`
* to be able to get/set data fit our redis store from node server with ioredis we need to set our authentication there as well.
* we do this in the Redis instantiation by passing a config object in the constructor with the password: property and value our password string `const redis = new Redis({password: 'rootroot'});`

## Section 3 - Datasets in Depth

### Exploration of Strings

* we see a number of operations
* we can set numbers `set address 453`
* we can increase a number by one with a command: `incr address` => 454
* we can increase by a specific number: incrby address 1000 => 1454
* we can decrease by one or by a number: decr address => 1453, decrby address 500 => 953
* we can use complex strings as values putting them in doublequotes: set country "South Africa"
* we can get a value and then set it in one command: getset firstName Steph. this command returns the previous value and then sets the new one.
* we can set multiple key -value pairs: `127.0.0.1:6379> mset street seaward city ventura country usa zip "92101-2878292"`
* we can get multiple values with mget: `mget street city country zip`
* we can check the existence of a key with: `exists street`. if it exists we get 1 otherwise 0
* we can set a timeout to erase a key-vlaue pair. with expire zip 30. after 30 secs the zip key-value pair will cease to exist.
* we can set a value and set expiration timeout in 1 command. `set zip "4324324" ex 10`

### Strings in Action

* we will use ioredis to issue commands.
* we first check setting the expiration of a value

```
redis.set('name', 'thanasis', 'EX', 5);
redis.get('name', (err, result) => {
	console.log(result);

});
setTimeout(()=> {
	redis.get('name', (err, result) => {
		console.log(result);

	});
},6000);
```

* by adding 'EX' and the value in ms we set the expiration timeout. we test it adding a settimeout callback
* we can incrby a value `redis.incrby('address',300);`
* we can mget and mset in ioredis

```
redis.mset('street', 'Awesome', 'city', 'San Francisco');
redis.mget('street','city',(err,result) => {
	console.log(result);
});
```

### The hash data structure

* hashes are like javascript objects, we can add in them as many key value pairs as we want. [hash commands](https://redis.io/commands#hash)
* hashes are identified and called by a key or id.
* we can set multiple key/value pairs in a hash with hmset: `hmset user:345 firstName Tracey lastName Larvent street awesome city awesomer`
* we can get all key/value pairs of a hash with hgetall: `hgetall user:345`
* we can get a specific value with hget the id and the key: `hget user:345 city`
* we can get multiple values from a hashwith hmget and the keys: `hmget user:345 firstName city street`
* we can check existence of a key value in a hash with hexists: ` hexists user:345 zip`
* we can add keyvalues in an existing hash with hmset
* we can increase a numerical value in a hash with hincrby: `hincrby user:345 address 367`

### Hashes in Action

* we put all strings code in a separate file and import it.
* we add a hashes js file and put  our code there. 

```
	redis.hmset('user:450','firstName','Jeremy','lastName','Irons');
	redis.hgetall('user:450', (err,result) => {
		console.log(result);
	});
```

* hashes methods in ioredis return js objects

* we incr with hincrby

```
redis.hmset('user:450', 'address', 234);
redis.hincrby('user:450', 'address', 100);
```

### Exploration of Lists

* we push  values in a list with rpush `rpush groceries cherries apples berries`
* we get list values with lrange and the first ans last index `lrange groceries 0 -1` returns 1) "cherries" 2) "apples" 3) "berries" . -1 subtracts zero from end
* -2 subtracts one value from end and so on . 1 instead of 0 excludes one  value from start. 2 excludes 2 and so on `lrange groceries 0 -4` returns empty
* lpush adds a value in the left
* lpop returns one first value from left (start) and deletes it
* rpop returns one first value from rigth (end) and deletes it
* ltrim  trims the list keeping only the range specified `ltrim groceries 0 4` keeps only values with index 0 to 4 (5 values)

### Lists in Action

* we run our commands with ioredis in js

```
	redis.ltrim('planets',0, 0);

	redis.rpush('planets', 'venus', 'earth', 'mars', 'jupiter');

	redis.rpush('planets', 'saturn');

	redis.lpush('planets', 'mercury');

	redis.rpop('planets');

	redis.lrange('planets', 0, -1, (error,result) => {
		console.log(result);
	})
```

### Challenge: Implement Ioredis

* redis sets are collections of unique strings that are not in order
* where do we use sets? in a place where we nedd to add unique data that does not need to be ordered e.g tags on a block