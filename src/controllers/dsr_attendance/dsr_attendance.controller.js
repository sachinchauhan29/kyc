const { selectAuthentication, filterDataAuthentication, getAWSMCity, getTotalCount, totalEntries } = require("../../models/authentication.model");

const dsr_attendancemodel = require('../../models/dsr-attendance.model'); 

const attendanceView = async (req, res, next) => {

  if (req.query.page == -1) {
    req.query.page = 1;
  }

  let attendanceDetails = await dsr_attendancemodel.getattendance(req.query);
  let awsmCity = await getAWSMCity();
  let totalRows = await getTotalCount();
  let totalEntrie = await totalEntries();

  const maxVisiblePages = 4;
  let currentPage = req.query.page || 1;
  const startPage = Math.max(parseInt(currentPage) - Math.floor(maxVisiblePages / 2), 1);
  const endPage = Math.min(startPage + maxVisiblePages - 1, totalRows);

  res.render('dsr_attendance', { user: res.userDetail, attendanceDetails,userResult11:attendanceDetails, awsmCity, QueryData: attendanceDetails, notification: res.notification, startPage, endPage, currentPage, totalRows, totalEntrie });
}

module.exports = {
    attendanceView
}