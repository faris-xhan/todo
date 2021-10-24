const session = require("express-session");
const redis = require("redis");
const connecRedis = require("connect-redis");
const RedisStore = connecRedis(session);
const redisClient = redis.createClient();
const store = new RedisStore({ client: redisClient });

redisClient.on("error", function (err) {
   console.log("Could not establish a connection with redis. " + err);
});

redisClient.on("connect", function (err) {
   console.log("Connected to redis successfully");
});

module.exports = {
   redisClient,
   store,
};
