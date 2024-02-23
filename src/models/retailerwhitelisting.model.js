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
        query += ` AND \`ASM Area Code\` = '${data.ASMAreaCode}'`;
    }
    if (data && data.SO) {
        query += ` AND \`SO\` = '${data.SO}'`;
    }
    if (data && data.DistributorCode) {
        query += ` AND \`Distributor Code\` = '${data.DistributorCode}'`;
    }
    if (data && data.DistributorName) {
        query += ` AND \`Distributor Name\` = '${data.DistributorName}'`;
    }
    if (data && data.RetailerCode) {
        query += ` AND RetailerCode = '${data.RetailerCode}'`;
    }
    if (data && data.RetailerName) {
        query += ` AND RetailerName = '${data.RetailerName}'`;
    }
    if (data && data.SalesManCode) {
        query += ` AND \`SalesMan Code\` = '${data.SalesManCode}'`;
    }
    if (data && data.SalesManName) {
        query += ` AND \`SalesMan Name\` = '${data.SalesManName}'`;
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

module.exports = { retailer, insertIntoFileProcessretailerwhitelisting, getUploadRecords, exportWhitelisting }