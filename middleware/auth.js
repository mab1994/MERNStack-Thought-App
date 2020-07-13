const jwt = require('jsonwebtoken')
const jwtSecret = 'asecret'

module.exports = function( req, res, next ) {
    // ---Get The Token From The Request Header---
    const token = req.header('x-auth-token')

    // ---Check If The Token Exists!---
    if(!token) { return res.json({ msg: 'Access Denied! No Token found' }) }
    jwt.verify( token, jwtSecret, ( err, decoded ) => {
        if( err ) throw err
        req.user = decoded.user
        next()
    })
}