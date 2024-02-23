

const express = require('express');
const retailerCtrl = require("../../controllers/retailer/retailer.controller");
const { userAuth } = require("../../util/auth");
const { getDetails } = require("../../util/jwt");
const { getNotification } = require('../../util/notify');


const router = express.Router();


router.route('/').get(userAuth, getDetails, getNotification, retailerCtrl.retailerView);
router.route('/export').get(userAuth, getDetails, retailerCtrl.exportKYCData);
module.exports = router;