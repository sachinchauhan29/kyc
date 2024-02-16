const { updateFreshKycStatus, updateReKycStatus, updateReplaceKycStatus, selectKycData, filterKycData, getAWSMCity, updateKycStatus, SaveThirdPartyData, CurrentUser } = require("../../models/kyc.model");
const { updateNotification } = require("../../models/notification.model");
const distributormodel = require("../../models/distributor.model");
const axios = require('axios');

const distributorView = async (req, res) => {
    let allDetails = await distributormodel.getfilterDistrubutorkyc(req.query);
    console.log(req.query,".......................................................");
    let awsmCity = await getAWSMCity();
    res.render('distributor', { user: res.userDetail, kycData: allDetails, userResult11:allDetails,QueryData: allDetails, awsmCity, notification: res.notification });
}


// const filterApply = async(req,res)=>{
//     let allDetails = await distributormodel.getfilterDistrubutorkyc(req.body);
//     let awsmCity = await getAWSMCity();
//    console.log("................Hey I am from FilterApply.............", req.body);
//    res.render('distributor', { user: res.userDetail, kycData: allDetails, userResult11:allDetails,QueryData: allDetails, awsmCity, notification: res.notification});
// }

module.exports = {
    distributorView
}