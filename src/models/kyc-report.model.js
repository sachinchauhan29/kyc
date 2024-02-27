const dbCon = require('../config/db');


// const insertDataINKYCReportBase = async (data) => {
//   let insertQuery = `INSERT INTO kyc_report_base ( ase_email, ase_id, ase_name, aw_code, aw_name, awsm_code, awsm_name, bank_account_no, bank_name, address, beneficiary_name, ifsc_code, mobile_no, payment_status, payout_amount, payout_month, utr_no) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

//   let insertValues = [data.ase_email_id, data.ase_employee_code, data.ase_name, data.aw_code, data.aw_name, data.awsm_code, data.awsm_name, data.bank_account_no, data.bank_name, data.address, data.beneficiary_name, data.ifsc_code, data.mobile_no, data.payment_status, data.payout_amount, data.payout_month, data.utr_no];


//   return new Promise((resolve, reject) => {
//     dbCon.query(insertQuery, insertValues, (error, result) => {
//       if (error) {
//         return resolve(error);
//       }
//       return resolve(result);
//     });
//   });
// }
const insertDataINKYCReportBase = async (data) => {
  let insertQuery = `INSERT INTO uploadpayout (so_name, dsr_code, distributor_name, distributor_code, salary_payout, incentive_payout, payout_month) VALUES (?, ?, ?, ?, ?, ?, ?)`;

  let insertValues = [
    data.so_name,
    data.dsr_code,
    data.distributor_name,
    data.distributor_code,
    data.salary_payout,
    data.incentive_payout,
    data.payout_month
  ];

  return new Promise((resolve, reject) => {
    dbCon.query(insertQuery, insertValues, (error, result) => {
      if (error) {
        console.error("Error inserting data:", error);
        return reject(error);
      }
      return resolve(result);
    });
  });
};

const insertIntoFileProcess = async (data) => {
  let query = `INSERT INTO file_process (client_id, upload_type, original_file_name, file_name, file_size, process_status, reason, total_count, success_count, failure_count, updated_file_name, channel) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`;
  let values = [data.client_id, data.upload_type, data.original_file_name, data.file_name, data.file_size, data.process_status, data.reason, data.total_count, data.success_count, data.failure_count, data.updated_file_name, data.channel];

  return new Promise((resolve, reject) => {
    dbCon.query(query, values, (error, result) => {
      if (error) {
        return reject(error);
      }
      return resolve(result);
    });
  });
}



const insertThirdPartyAPILog = async (data) => {

  let insertQuery = `INSERT INTO third_party_api_log ( api_request, api_response, method_name) VALUES (?, ?, ?)`;

  let requestJson = JSON.stringify(data.api_request);
  let responseJson = JSON.stringify(data.api_response);
  let insertValues = [requestJson, responseJson, data.method_name];


  return new Promise((resolve, reject) => {
    dbCon.query(insertQuery, insertValues, (error, result) => {
      if (error) {
        return reject(error);
      }
      return resolve(result);
    });
  });
}


const selectKYCReportBase = async (data) => {
  let query = 'SELECT  * FROM uploadpayout  where 1 = 1';

  if (data.so_name) {
    query += ` AND uploadpayout.so_name = '${data.so_name}'`;
  }
  if (data.dsr_code) {
    query += ` AND uploadpayout.dsr_code = '${data.dsr_code}'`;
  }
  if (data.salesman_name) {
    query += ` AND uploadpayout.distributor_name = '${data.salesman_name}'`;
  }
  if (data.aw_name) {
    query += ` AND uploadpayout.distributor_code = '${data.aw_name}'`;
  }
  if (data.ase_code) {
    query += ` AND uploadpayout.salary_payout = '${data.ase_code}'`;
  }
  if (data.ase_name) {
    query += ` AND uploadpayout.incentive_payout = '${data.ase_name}'`;
  }
  if (data.state) {
    query += ` AND awsm_details.payout_month = '${data.state}'`;
  }
  if (data.fromDate && data.toDate) {
    query += ` AND DATE(uploadpayout.created_on) BETWEEN STR_TO_DATE('${data.fromDate}', '%Y-%m-%d') AND STR_TO_DATE('${data.toDate}', '%Y-%m-%d')`;
  }


  query += ' ORDER BY uploadpayout.created_on DESC LIMIT ? OFFSET ?';

  const page = parseInt(data.page) || 1;
  const pageSize = 10;
  const offset = (page - 1) * pageSize;

  return new Promise((resolve, reject) => {
    dbCon.query(query, [pageSize, offset], (error, result) => {
      if (error) {
        return reject(error);
      }
      return resolve(result);
    });
  });
}


const payoutExport = async (data) => {
  let query = 'SELECT  * FROM uploadpayout  where 1 = 1';

  if (data.so_name) {
    query += ` AND uploadpayout.so_name = '${data.so_name}'`;
  }
  if (data.dsr_code) {
    query += ` AND uploadpayout.dsr_code = '${data.dsr_code}'`;
  }
  if (data.salesman_name) {
    query += ` AND uploadpayout.distributor_name = '${data.salesman_name}'`;
  }
  if (data.aw_name) {
    query += ` AND uploadpayout.distributor_code = '${data.aw_name}'`;
  }
  if (data.ase_code) {
    query += ` AND uploadpayout.salary_payout = '${data.ase_code}'`;
  }
  if (data.ase_name) {
    query += ` AND uploadpayout.incentive_payout = '${data.ase_name}'`;
  }
  if (data.state) {
    query += ` AND awsm_details.payout_month = '${data.state}'`;
  }
  if (data.fromDate && data.toDate) {
    query += ` AND DATE(uploadpayout.created_on) BETWEEN STR_TO_DATE('${data.fromDate}', '%Y-%m-%d') AND STR_TO_DATE('${data.toDate}', '%Y-%m-%d')`;
  }

  query += ` ORDER BY uploadpayout.created_on DESC`;

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


const getTotalCount = () => {
  let countQuery = `
    SELECT COUNT(*) as total
    FROM uploadpayout WHERE 1 = 1
  `;

  return new Promise((resolve, reject) => {
    dbCon.query(countQuery, (err, result) => {
      if (err) {
        return reject(err);
      }

      const [totalCountRow] = result;
      const totalItems = totalCountRow.total;
      const pageSize = 10;
      const totalPages = Math.ceil(totalItems / pageSize);

      return resolve(totalPages);
    });
  });
};



const selectPayoutData = async () => {
  let query = 'SELECT kyc_report_base.*, awsm_details.*  from kyc_report_base INNER JOIN awsm_details on  kyc_report_base.awsm_code = awsm_details.awsm_code where 1 = 1 ';

  return new Promise((resolve, reject) => {
    dbCon.query(query, (error, result) => {
      if (error) {
        return reject(error);
      }
      return resolve(result);
    });
  });
}

module.exports = { insertDataINKYCReportBase, payoutExport, getTotalCount, selectKYCReportBase, insertThirdPartyAPILog, selectPayoutData, insertIntoFileProcess }