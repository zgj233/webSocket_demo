const mysql = require('mysql');
const poolConf = require('../config/poolConf');
const pool = mysql.createPool(poolConf);
let connect = ()=>{
  return new Promise((resolve, reject)=>{
      pool.getConnection((err,connection)=>{
          if(err){
              reject(err);
          }
          else {
              resolve(connection)
          }
      });

  });
};

module.exports = connect;