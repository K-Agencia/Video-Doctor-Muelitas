const errorHandling = (err, req, res, next) => {
  const error = '¡Ups! Tuvimos un problema interno, inténtalo más tarde';
  res.status(500).send(err.message || error);
  console.log(`ERROR! ${err}`);
}

export default errorHandling;