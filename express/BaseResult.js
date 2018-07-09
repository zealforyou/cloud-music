const getBaseResult = function (error_code,error_msg,data) {
   return {
      error_code: error_code,
      error_msg:error_msg,
      ...data
   };
};
module.exports = getBaseResult;