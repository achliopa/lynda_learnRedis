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