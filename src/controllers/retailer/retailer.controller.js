const { updateFreshKycStatus, updateReKycStatus, updateReplaceKycStatus, selectKycData, filterKycData, getAWSMCity, updateKycStatus, SaveThirdPartyData, CurrentUser } = require("../../models/kyc.model");
const { updateNotification } = require("../../models/notification.model");
const retailerKycModel = require('../../models/retailer_kyc.model');
const axios = require('axios');

const retailerView = async (req, res) => {
    let allDetails = await retailerKycModel.getretailerkyc(req.query);
    console.log(allDetails,"............................................................");
    let awsmCity = await getAWSMCity();
    res.render('retailer', { user: res.userDetail, kycData: allDetails, QueryData: req.query, awsmCity, notification: res.notification });

    // let allDetails = await distributormodel.getfilterDistrubutorkyc(req.query);
    // console.log(req.query,".......................................................");
    // let awsmCity = await getAWSMCity();
    // res.render('distributor', { user: res.userDetail, kycData: allDetails, userResult11:allDetails,QueryData: allDetails, awsmCity, notification: res.notification });
}


module.exports = {
    retailerView
}