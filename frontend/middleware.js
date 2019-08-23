module.exports = (req, res, next) => {
  const [, dev] = req.headers.authorization.split(' ');
  if(dev !== 'dev'){
    return res.status(401).json({error: {message:"unauthorized user, necessary to pass Bearer dev"}})
  }
  next()
}