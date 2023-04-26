const handleError = (res, status, message) => {
  return res.status(status).json({ result: false, message: message });
};

const handleRes = (res, status, data) => {
  return res.status(status).json({ result: true, data: data });
};

module.exports = {
  handleError: handleError,
  handleRes: handleRes,
};
