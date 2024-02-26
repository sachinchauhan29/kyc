const dbCon = require('../config/db');



const getretailerkyc = async (data) => {
  let query = `
  SELECT retailerkyc_details.*, awsm_details.*, aw_details.*, ase_details.*
  FROM retailerkyc_details
  INNER JOIN awsm_details ON awsm_details.awsm_code = retailerkyc_details.RetailerCode
  INNER JOIN aw_details ON retailerkyc_details.aw_code = aw_details.aw_code
  INNER JOIN ase_details ON retailerkyc_details.ase_email = ase_details.ase_email_id
  WHERE retailerkyc_details.status = 'PENDING' AND (kyc_type = 'FRESH' OR kyc_type = 'Replace-KYC-Request' OR kyc_type = 'RE-KYC-Request')
`;
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
const updateKycStatus = (data) => {
  let updateStatus = `UPDATE retailerkyc_details SET calling_count = '${data.calling_count || 0}', calling_status = '${data.calling_status || null}', calling_remarks = '${data.calling_remarks || null}', status = '${data.kyc_status || 'PENDING'}', wip_remarks = '${data.kyc_rejection_reason || null}', approved_comment = '${data.approved_comment}', approved_comment1 = '${data.approved_comment}' where kyc_id = '${data.kyc_id}'`

  return new Promise((resolve, reject) => {
    dbCon.query(updateStatus, (error, result) => {
      if (error) {
        return reject(error);
      } else {
        return resolve(result);
      }
    });
  });
}
const updateFreshKycStatus = (data) => {
  let updateStatus = `UPDATE retailerkyc_details SET calling_count = '${data.calling_count || 0}', calling_status = '${data.calling_status || null}', calling_remarks = '${data.calling_remarks || null}', status = '${data.kyc_status || 'PENDING'}', wip_remarks = '${data.kyc_rejection_reason || null}', approved_on = '${data.todayDate}', approved_by = '${data.userName}', approved_comment = '${data.approved_comment}', approved_comment1 = '${data.approved_comment}',updated_date = '${data.todayDate}' where kyc_id = '${data.kyc_id}'`

  return new Promise((resolve, reject) => {
    dbCon.query(updateStatus, (error, result) => {
      if (error) {
        return reject(error);
      } else {
        return resolve(result);
      }
    });
  });
}

const updateReplaceKycStatus = (data) => {
  let updateStatus = `UPDATE retailerkyc_details SET calling_count = '${data.calling_count || 0}', calling_status = '${data.calling_status || null}', calling_remarks = '${data.calling_remarks || null}', status = '${data.kyc_status || 'PENDING'}', wip_remarks = '${data.kyc_rejection_reason || null}', replace_kyc_edit_on = '${data.todayDate}', replace_kyc_edit_by = '${data.userName}', kyc_type = '${'Replace-KYC'}', approved_comment= '${data.approved_comment}', approved_comment1 = '${data.approved_comment}', updated_date = '${data.todayDate}' where kyc_id = '${data.kyc_id}'`

  return new Promise((resolve, reject) => {
    dbCon.query(updateStatus, (error, result) => {
      if (error) {
        return reject(error);
      } else {
        return resolve(result);
      }
    });
  });
}

const updateReKycStatus = (data) => {
  let updateStatus = `UPDATE retailerkyc_details SET calling_count = '${data.calling_count || 0}', calling_status = '${data.calling_status || null}', calling_remarks = '${data.calling_remarks || null}', status = '${data.kyc_status || 'PENDING'}', wip_remarks = '${data.kyc_rejection_reason || null}', re_kyc_edit_on = '${data.todayDate}', re_kyc_edit_by = '${data.userName}', kyc_type = '${'RE-KYC'}', approved_comment = '${data.approved_comment}', approved_comment1 = '${data.approved_comment}', updated_date = '${data.todayDate}' where kyc_id = '${data.kyc_id}'`

  return new Promise((resolve, reject) => {
    dbCon.query(updateStatus, (error, result) => {
      if (error) {
        return reject(error);
      } else {
        return resolve(result);
      }
    });
  });
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

const CurrentUser = async (email) => {

  let query = `SELECT * FROM awsm_users WHERE email = '${email}'`;

  return new Promise((resolve, reject) => {
    dbCon.query(query, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

module.exports = { getretailerkyc, updateKycStatus, CurrentUser, updateReplaceKycStatus, updateReKycStatus, updateFreshKycStatus }
