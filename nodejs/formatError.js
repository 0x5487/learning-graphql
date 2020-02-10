const {formatError} = require('graphql');

module.exports = error => {
  const data = formatError(error);
  const {originalError} = error;
  data.code = originalError && originalError.code;
  return data;
};