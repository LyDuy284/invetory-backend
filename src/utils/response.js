const success = (res, data, message = 'Success') => {
  return res.json({ message, data });
};

const error = (res, statusCode = 500, message = 'Server error') => {
  return res.status(statusCode).json({ message });
};

module.exports = { success, error };
