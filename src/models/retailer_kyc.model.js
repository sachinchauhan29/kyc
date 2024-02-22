const dbCon = require('../config/db');



const getretailerkyc = async(data)=>{
    
    let query = "SELECT * FROM retailerkyc_details WHERE 1=1 ";
    // if(data.Mobile) {
    //   query += ` AND distributor_kyc.mobile_no = '${data.Mobile}'`;
    // }
    // if(data.email) {
    //   query += ` AND distributor_kyc.email_id = '${data.email}'`;
    // }
    // if(data.toDate && data.fromDate)
    // {
    //     query+=`AND distributor_kyc.create_date BETWEEN '${data.fromDate}' and '${data.toDate}'`;
    // }

  //  console.log(query);

  return new Promise((resolve, reject) => {
    dbCon.query(query, (error, result) => {
      if (error) {
        return reject(error);
      } else {
        // console.log("here is the result broooo",result);
        return resolve(result);
      }
    })
  })

}

// const getAllDistrubutorkyc = async()=>{
//    let query = "select * from distributor_kyc";

//    return new Promise((resolve, reject) => {
//     dbCon.query(query, (error, result) => {
//       if (error) {
//         return reject(error);
//       } else {
//         return resolve(result);
//       }
//     })
//   })
// }



module.exports = {getretailerkyc}
