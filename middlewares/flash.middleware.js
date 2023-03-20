const flashMiddleware = function (req, res, next) {
  req.locals.success = req.flash;
  next();
};
module.exports = flashMiddleware;
