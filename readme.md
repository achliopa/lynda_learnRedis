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