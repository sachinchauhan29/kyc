const dbCon = require('../config/db');

const retailer = async (data) => {
    let query = `SELECT * FROM retailerwhitelisting WHERE 1=1`;

    if (data && data.Region) {
        query += ` AND Region = '${data.Region}'`;
    }
    if (data && data.RSM) {
        query += ` AND RSM = '${data.RSM}'`;
    }
    if (data && data.ASMAreaCode) {
        query += ` AND \`ASMAreaCode\` = '${data.ASMAreaCode}'`;
    }
    if (data && data.SO) {
        query += ` AND \`SO\` = '${data.SO}'`;
    }
    if (data && data.DistributorCode) {
        query += ` AND \`DistributorCode\` = '${data.DistributorCode}'`;
    }
    if (data && data.DistributorName) {
        query += ` AND \`DistributorName\` = '${data.DistributorName}'`;
    }
    if (data && data.RetailerCode) {
        query += ` AND RetailerCode = '${data.RetailerCode}'`;
    }
    if (data && data.RetailerName) {
        query += ` AND \`RetailerName\` = '${data.RetailerName}'`;
    }
    if (data && data.SalesManCode) {
        query += ` AND \`SalesManCode\` = '${data.SalesManCode}'`;
    }
    if (data && data.SalesManName) {
        query += ` AND \`SalesManName\` = '${data.SalesManName}'`;
    }
    if (data && data.toDate && data.fromDate) {
        query += ` AND created_date BETWEEN '${data.fromDate}' and '${data.toDate}'`;
    }
    if (data && data.SalesManEmpCode) {
        query += ` AND SalesManEmpCode = '${data.SalesManEmpCode}'`;
    }

    // console.log(query, "..............", data);
    console.log(query); // Log the constructed query for debugging

    // Return a promise for executing the query
    return new Promise((resolve, reject) => {
        dbCon.query(query, (err, result) => {
            if (err) {
                reject(err); // Reject the promise with the error if query execution fails
            } else {
                resolve(result); // Resolve the promise with the query result
            }
        });
    });
}
const insertIntoFileProcessretailerwhitelisting = async (data) => {
    let query = `INSERT INTO retailerwhitelisting_file_process(original_file_name, file_name, file_size, process_status, reason, total_counts, success_counts, failure_counts, updated_file_name, channel) VALUES(?,?,?,?,?,?,?,?,?,?)`;
    let values = [data.original_file_name, data.file_name, data.file_size, data.process_status, data.reason, data.total_count, data.success_count, data.failure_count, data.updated_file_name, data.channel];

    return new Promise((resolve, reject) => {
        dbCon.query(query, values, (error, result) => {
            if (error) {
                return reject(error);
            }
            return resolve(result);
        });
    });
}

const getUploadRecords = async () => {
    let query = `SELECT * FROM retailerwhitelisting_file_process ORDER BY insert_datetime DESC LIMIT 10`;

    return new Promise((resolve, reject) => {
        dbCon.query(query, (error, result) => {
            if (error) {
                return reject(error);
            }
            return resolve(result);
        });
    });
}
const exportWhitelisting = async (data) => {
    let query = `SELECT * FROM retailerwhitelisting   WHERE 1 = 1`;

    console.log(data, 'exportWhitelisting', query);
    const queryParams = [];

    return new Promise((resolve, reject) => {
        dbCon.query(query, queryParams, (error, result) => {
            if (error) {
                return reject(error);
            }
            return resolve(result);
        });
    });
};

const updateKYCDetailHistory = async (data) => {

    let query = `INSERT INTO retailerwhitelisting(kyc_id, awsm_history_id, ase_email, aw_code, awsm_code, approved_by, approved_comment, gender, dob, bank_account_no, address, bank_cheque, bank_name, beneficiary_name, created_on, created_by, ifsc_code, mobile_no, photo_id, photo, status, bio_status, calling_count, calling_remarks, calling_status, kyc_type, wip_remarks, reason) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    let values = [data.kyc_id, data.awsm_history_id, data.ase_email, data.aw_code, data.awsm_code, data.approved_by, data.approved_comment, data.gender, data.dob, data.bank_account_no, data.address, data.bank_cheque, data.bank_name, data.beneficiary_name, data.created_on, data.created_by, data.ifsc_code, data.mobile_no, data.photo_id, data.photo, data.status, data.bio_status, data.calling_count, data.calling_remarks, data.calling_status, data.kyc_type, data.wip_remarks, data.reason];

    return new Promise((resolve, reject) => {
        dbCon.query(query, values, (error, result) => {
            if (error) {
                return reject(error);
            }
            return resolve(result);
        });
    });
}

module.exports = { retailer, insertIntoFileProcessretailerwhitelisting, getUploadRecords, exportWhitelisting, updateKYCDetailHistory }