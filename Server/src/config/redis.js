const redis = require('redis');
require('dotenv').config();

const client = redis.createClient({
    url: process.env.REDIS_URL,
    socket: {
        reconnectStrategy: false
    }
});

// Supress redis connection log spam in local dev without a redis server
client.on('error', () => { });

const connectRedis = async () => {
    try {
        await client.connect();
        console.log('Redis Connected...');
    } catch (err) {
        console.error('Redis Connection Error:', err.message);
    }
};

module.exports = { client, connectRedis };
