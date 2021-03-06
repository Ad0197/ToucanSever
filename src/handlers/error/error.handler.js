exports.unkwonRouteGenericHandler = () => (req, res, next) => {
  res
    .status(404)
    .send({
      error: 404,
      message: "You cannot reach this route",
    })
    .end();
};

exports.errorRouteHandler = () => (err, req, res, next) => {
  res
    .status(err.status || 400)
    .json(err.error)
    .end();
  throw err.error;
};
