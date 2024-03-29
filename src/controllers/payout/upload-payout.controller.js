const { insertDataINKYCReportBase, insertThirdPartyAPILog, insertIntoFileProcess } = require("../../models/kyc-report.model");
const axios = require('axios')
const fs = require('fs');
const json2csv = require('json2csv').parse;
const moment = require('moment');
const timestamp1 = moment().valueOf();
const csvFileName = `SamplePayout_2_${timestamp1}_feedback.csv`;
const path = require('path');

const uploadPayoutView = async (req, res) => {
  res.render('upload-payout', { user: res.userDetail, notification: res.notification })
}

const uploadPayoutFile = async (req, res) => {

  // console.log(res); // eslint-disable-line no-console
  try {
    let csvData = req.files.file.data.toString().split('\n');
    const dataArray = csvData.map(row => row.split(','));
    let data = dataArray.slice(1, -1);

    let success_count = 0;
    let failure_count = 0;
    let excelArray = [];

    // Use map to create an array of promises
    const promiseArray = data.map(async (element) => {
      let excelObject = {
        name: element[0],
        dsrcode: element[1],
        dsrname: element[2],
        distributor_name: element[3],
        distributor_code: element[4],
        SalaryPayout: element[5],
        IncentivePayout: element[6],
        payout_month: element[7],
      }
      let dbResult = await insertDataINKYCReportBase(excelObject);
      console.log(dbResult);
      // if (dbResult.effectedRows !== 0) {
      //   success_count++;
      //   const apiUrl = 'https://arteriacp.apimanagement.ap1.hana.ondemand.com/crazibrain/ss/v1/sppayout/AGGRBRIT'
      //   let todayDate = new Date().toLocaleDateString('en-IN');
      //   let [day, month, year] = todayDate.split('/');
      //   let formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      //   const postData = {
      //     spNo: element[5],
      //     payoutMonth: element[15],
      //     payoutAmount: element[16],
      //     payoutCurrency: 'INR',
      //     payoutDate: formattedDate,
      //     payoutStatus: element[17],
      //     payoutUTRNo: element[18],
      //   }

      //   const username = 'P006026';
      //   const password = 'Arteria@2020';
      //   const basicAuth = 'Basic ' + btoa(username + ':' + password);
      //   const headers = {
      //     'Authorization': basicAuth,
      //     'Custom-Header': 'header-value',
      //     'apikey': 'W4jgqCFydIb7AcOrRhEiD0krcuGuobsz'
      //   };

      //   const response = await axios.post(apiUrl, postData, { headers });

      //   let logData = {
      //     api_request: postData,
      //     api_response: response.data,
      //     method_name: 'POST'
      //   }
      //   // console.log(logData);
      //   await insertThirdPartyAPILog(logData)
      // } else {
      //   failure_count++;
      // }
      excelArray.push(excelObject)
    });

    Promise.all(promiseArray)
      .then(async () => {
        const fields = [
          { label: "SO NAME", value: 'name' },
          { label: 'DSR CODE', value: 'dsrcode' },
          { label: 'DISTRIBUTOR Name', value: "distributor_name" },
          { label: 'DISTRIBUTOR CODE', value: 'distributor_code' },
          { label: 'Salary Payout', value: 'SalaryPayout' },
          { label: 'Incentive Payout', value: 'IncentivePayout' },
          { label: 'Payout Month', value: 'payout_month' },
        ];
        const csv = json2csv(excelArray, { fields });
        const dynamicBasePath = '../../../src/public/payout_files/';
        const directoryPath = path.join(__dirname, dynamicBasePath);
        const filePath = path.join(directoryPath, csvFileName);

        fs.writeFileSync(filePath, csv);
        let imageHostUrl = req.protocol + '://' + req.get('host') + '/public/payout_files/' + csvFileName;

        let fileData = {
          client_id: 'BRIT_20190625',
          upload_type: "EDIT",
          original_file_name: req.files.file.name,
          file_name: csvFileName,
          file_size: req.files.file.size,
          process_status: "COMPLETED",
          reason: 'SUCCESS',
          total_count: data.length,
          success_count: success_count,
          failure_count: failure_count,
          updated_file_name: imageHostUrl,
          channel: "GT",
        }
        // Upload Data into file_process
        await insertIntoFileProcess(fileData);
        return res.redirect('/upload-payout');
      })
      .catch((error) => {
        console.error('Error:', error);
        return res.redirect('/upload-payout');
      });
  }
  catch (error) {
    console.log("ERROR : ", error);
    return res.redirect('/upload-payout');
  }
}

module.exports = {
  uploadPayoutView,
  uploadPayoutFile
}