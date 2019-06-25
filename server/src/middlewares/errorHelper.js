const boom = require("boom");

module.exports = {
  errorHandler: (err, req, res, next) => {
    // ルートの処理内でレスポンスが送信されている場合は、そのままエラー処理実行
    if (res.headersSent) return next(err);

    // isBoom = true : boomを介したエラー処理
    return err.isBoom
      ? res.status(err.output.statusCode).json(err.output.payload)
      : res.status(err.statusCode).json(err);
  },

  // 404 Not Found
  errorNotFound: (req, res, next) => {
    const err = boom.notFound("This page could not be found.");
    next(err);
  }
};
