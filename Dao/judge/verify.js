const connect = require('../mysqlPool');
const sql ={
    query : 'SELECT * FROM user WHERE name=? '
};
const verifyDao = {
    query: async (req_body,next) =>{
        let connection = await connect().then().catch(err =>{
            console.error(err);
        });

        return new Promise((resolve, reject)=>{
            connection.query(sql.query, req_body.User,(error, results, fields)=>{
                if(error){
                    reject (error)
                }
                else {
                    resolve (results)
                }
            })

        });


    }
};

module.exports =verifyDao
