const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


// ---Generate A JWT Secret---
const jwtSecret = "asecret"


// ---Import User Model---
const User = require('../models/User')


// ---Import the Authentication Middleware---
const auth = require('../middleware/auth')


// ---Get the logged-in Author - Private Route---
router.get('/', auth, ( req, res ) => {
    User.findById( req.user.id ).then( user => res.json(user) ).catch( err => console.log( err.message ) )
})


// ---Log in the Author - Get the JW Token---
router.post('/', [
    check('mail', 'Submit a valid email!').not().isEmpty().isEmail(),
    check('password', 'Submit the password').not().isEmpty()
] , ( req, res ) => {
    const ers = validationResult(req)
    if(!ers.isEmpty()) {
        return res.json({ ers: ers.array() })
    }
    
    const { mail, password } = req.body
    User.findOne({ mail }).then( user => {
        if(!user) {
            // ---Check If The User Exists!---
            return res.json({ msg: "Inexistent Author! Please Register Free So You Can Use This Service" })
        } else {
            // ---Check The Validity Of The Password---
            bcrypt.compare( password, user.password, ( err, isMatch ) => {
                if(err) { console.log( err.message ) }
                else if(isMatch) {
                    const payload = {
                        user: {
                            id: user.id
                        }
                    }
                    jwt.sign( payload, jwtSecret, { expiresIn: 7200000 }, ( err, token ) => {
                        if(err) throw err
                        res.json({ token })
                    } )
                }
                else { return res.json({ msg: 'Wrong Password ! Try Again' }) }
            } )
        }
    })
    .catch(err => console.log(err.message))

})


module.exports = router