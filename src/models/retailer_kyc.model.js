const dbCon = require('../config/db');



const getretailerkyc = async (data) => {
  let query = `
  SELECT 
      retailerkyc_details.*, 
      awsm_details.*, 
      aw_details.*, 
      ase_details.* 
  FROM 
      retailerkyc_details 
      INNER JOIN 
      awsm_details ON awsm_details.awsm_code = retailerkyc_details.RetailerCode 
      INNER JOIN 
      aw_details ON retailerkyc_details.aw_code = aw_details.aw_code 
      INNER JOIN 
      ase_details ON retailerkyc_details.ase_email = ase_details.ase_email_id`;

  if (data.Mobile) {
    query += ` AND retailerkyc_details.mobile_no = '${data.Mobile}'`;
  }
  if (data.email) {
    query += ` AND retailerkyc_details.email_id = '${data.email}'`;
  }
  if (data.RetailerCode) {
    query += ` AND retailerkyc_details.RetailerCode = '${data.RetailerCode}'`;
  }
  if (data.awsm_name) {
    query += ` AND awsm_details.awsm_name = '${data.awsm_name}'`;
  }
  if (data.salesman_type) {
    query += ` AND awsm_details.salesman_type = '${data.salesman_type}'`;
  }
  if (data.aw_code) {
    query += ` AND awsm_details.aw_code = '${data.aw_code}'`;
  }
  if (data.toDate && data.fromDate) {
    query += ` AND retailerkyc_details.create_date BETWEEN '${data.fromDate}' and '${data.toDate}'`;
  }

  // Add the LIMIT clause at the end of the query
  query += ` LIMIT 5`;

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



module.exports = { getretailerkyc }
