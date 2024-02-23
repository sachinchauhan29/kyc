const dbCon = require('../config/db');


const selectKYCHistory = async (data) => {
  // let query = `select kyc_details_history.*, awsm_details.*, aw_details.*, ase_details.* from kyc_details_history INNER JOIN awsm_details on awsm_details.awsm_code=kyc_details_history.awsm_code INNER JOIN aw_details on kyc_details_history.aw_code = aw_details.aw_code INNER JOIN ase_details on kyc_details_history.ase_email = ase_details.ase_email_id where 1 = 1 AND kyc_type != 'FRESH'`;
  let query = `select retailerkyc_details.created_on, retailerkyc_details.kyc_type, retailerkyc_details.ase_email, retailerkyc_details.aw_code, retailerkyc_details.RetailerCode, retailerkyc_details.bank_account_no, retailerkyc_details.ifsc_code, retailerkyc_details.address, retailerkyc_details.bank_cheque, retailerkyc_details.bank_name, retailerkyc_details.photo, retailerkyc_details.beneficiary_name, retailerkyc_details.photo_id, retailerkyc_details.mobile_no, retailerkyc_details.calling_count, retailerkyc_details.calling_status, retailerkyc_details.calling_remarks, retailerkyc_details.status, retailerkyc_details.wip_remarks, retailerkyc_details.approved_comment, retailerkyc_details.approved_on, retailerkyc_details.gender, retailerkyc_details.dob, retailerkyc_details.update_timestamp, retailerkyc_details.update_old_modification_date, retailerkyc_details.re_kyc_edit_on, retailerkyc_details.replace_kyc_edit_on ,retailerkyc_details.approved_kyc_edit_on ,  awsm_details.channel, awsm_details.awsm_name, awsm_details.salesman_type, awsm_details.awsm_city, awsm_details.awsm_state,  aw_details.aw_name, ase_details.ase_employee_code, ase_details.ase_name from retailerkyc_details INNER JOIN awsm_details on awsm_details.awsm_code=retailerkyc_details.RetailerCode INNER JOIN aw_details on aw_details.aw_code = retailerkyc_details.aw_code INNER JOIN ase_details on ase_details.ase_email_id = retailerkyc_details.ase_email where 1 = 1 AND retailerkyc_details.status != 'PENDING'`;

  if (data.Mobile) {
    query += ` AND retailerkyc_details.mobile_no = '${data.Mobile}'`;
  }
  if (data.salesman_id) {
    query += ` AND retailerkyc_details.RetailerCode = '${data.salesman_id}'`;
  }
  if (data.salesman_name) {
    query += ` AND awsm_details.awsm_name = '${data.salesman_name}'`;
  }
  if (data.salesman_type) {
    query += ` AND awsm_details.salesman_type = '${data.salesman_type}'`;
  }
  if (data.aw_code) {
    query += ` AND retailerkyc_details.aw_code = '${data.aw_code}'`;
  }
  if (data.aw_name) {
    query += ` AND aw_details.aw_name = '${data.aw_name}'`;
  }
  if (data.ase_code) {
    query += ` AND ase_details.ase_employee_code = '${data.ase_code}'`;
  }
  if (data.ase_name) {
    query += ` AND ase_details.ase_name = '${data.ase_name}'`;
  }
  if (data.fromDate && data.toDate) {
    query += ` AND retailerkyc_details.created_on  >= ? AND retailerkyc_details.created_on <= DATE_ADD(?, INTERVAL 1 DAY)`;
  }
  if (data.state) {
    query += ` AND awsm_details.awsm_state = '${data.state}'`;
  }
  if (data.city) {
    query += ` AND awsm_details.awsm_city = '${data.city}'`;
  }
  if (true) {
    query += ` ORDER BY retailerkyc_details.created_on DESC`;
  }
  if (data.limit || true) {
    query += ` LIMIT ${parseInt(5)}`;
  }
  const queryParams = [];

  if (data.fromDate && data.toDate) {
    queryParams.push(data.fromDate, data.toDate);
  }
  return new Promise((resolve, reject) => {
    dbCon.query(query, queryParams, (error, result) => {
      if (error) {
        return reject(error);
      }
      return resolve(result);
    });
  });
}

const downloadHistoryAllData = async (data) => {
  let query = `select kyc.created_on, kyc.kyc_type, kyc.ase_email, kyc.aw_code, kyc.awsm_code, kyc.bank_account_no, kyc.ifsc_code, kyc.address, kyc.bank_cheque, kyc.bank_name, kyc.beneficiary_name, kyc.photo_id, kyc.mobile_no, kyc.calling_count, kyc.calling_status, kyc.photo, kyc.calling_remarks, kyc.status, kyc.wip_remarks, kyc.approved_comment, kyc.approved_on, kyc.gender, kyc.dob, kyc.update_timestamp, kyc.update_old_modification_date,  kyc.re_kyc_edit_on, kyc.replace_kyc_edit_on, kyc.approved_kyc_edit_on, awsm.channel, awsm.salesman_type, awsm.awsm_name, awsm.awsm_city, awsm.awsm_state,  aw.aw_name, ase.ase_employee_code, ase.ase_name 
  from retailerkyc_details AS kyc
  INNER JOIN awsm_details AS awsm on awsm.awsm_code=kyc.RetailerCode 
  INNER JOIN aw_details AS aw on aw.aw_code = kyc.aw_code 
  INNER JOIN ase_details AS ase on ase.ase_email_id = kyc.ase_email 
  where 1 = 1 AND kyc.status != 'PENDING'`

  if (data.mobile_no) {
    query += ` AND kyc.mobile_no = '${data.mobile_no}'`;
  }
  if (data.awsm_code) {
    query += ` AND kyc.RetailerCode = '${data.awsm_code}'`;
  }
  if (data.awsm_name) {
    query += ` AND awsm.awsm_name = '${data.awsm_name}'`;
  }
  if (data.salesman_type) {
    query += ` AND awsm.salesman_type = '${data.salesman_type}'`;
  }
  if (data.aw_code) {
    query += ` AND kyc.aw_code = '${data.aw_code}'`;
  }
  if (data.aw_name) {
    query += ` AND aw.aw_name = '${data.aw_name}'`;
  }
  if (data.ase_code) {
    query += ` AND ase.ase_employee_code = '${data.ase_code}'`;
  }
  if (data.ase_name) {
    query += ` AND ase.ase_name = '${data.ase_name}'`;
  }
  if (data.fromDate && data.toDate) {
    query += ` AND DATE(kyc.created_on) BETWEEN STR_TO_DATE('${data.fromDate}', '%Y-%m-%d') AND STR_TO_DATE('${data.toDate}', '%Y-%m-%d')`;
  }
  if (data.awsm_state) {
    query += ` AND awsm.awsm_state = '${data.awsm_state}'`;
  }
  if (data.awsm_city) {
    query += ` AND awsm.awsm_city = '${data.awsm_city}'`;
  }

  query += ` ORDER BY kyc.created_on DESC`;

  const limit = parseInt(1000000000);
  if (!isNaN(limit) && limit > 0) {
    query += ` LIMIT ${limit}`;
  }

  return new Promise((resolve, reject) => {
    dbCon.query(query, (error, result) => {
      if (error) {
        return reject(error);
      }
      return resolve(result);
    });
  });
};


const getAWSMCity = () => {
  let awsmCityQuery = 'SELECT awsm_city, COUNT(*) AS city_count FROM awsm_details GROUP BY awsm_city';

  return new Promise((resolve, reject) => {
    dbCon.query(awsmCityQuery, (error, result) => {
      if (error) {
        return reject(error);
      } else {
        return resolve(result);
      }
    });
  });
}


module.exports = { selectKYCHistory, getAWSMCity, downloadHistoryAllData }