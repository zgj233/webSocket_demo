const redis = require('ioredis');
const option = require('../config/redisConf');
const client = new redis(option);
const keyPack = {
    query: async (user)=>{
        return client.hget('socket', user);
    },
    post: async (user, id) => {
        return client.hset('socket', user, id);
    }
};

module.exports =keyPack