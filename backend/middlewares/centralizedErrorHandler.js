module.exports.centralizedErrorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? 'Ошибка на стороне сервера.' : message,
  });

  next();
};
