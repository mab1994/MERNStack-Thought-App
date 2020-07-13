const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


// ---Generate A JWT Secret---
const jwtSecret = "asecret"


// ---Import User Model---
const User = require('../models/User')


// REGISTER - Add New Author
router.post('/', [
    check('firstname', 'Required Field!').not().isEmpty(),
    check('lastname', 'Required Field!').not().isEmpty(),
    check('photo', 'Required Field!').not().isEmpty(),
    check('birthdate', 'Required Field!').not().isEmpty(),
    check('country', 'Required Field! Submit a valid country').not().isEmpty(),
    check('degree', 'Required Field! Submit your latest academic degree').not().isEmpty(),
    check('institution', 'Required Field! Submit the institution where you obtained your last degree').not().isEmpty(),
    check('bio', 'Required Field! Submit a little biography of you').not().isEmpty(),
    check('mail', 'Required Field! An email must be with format: xyz@site.domain').not().isEmpty().isEmail(),
    check('password', 'Required Field! Password must be 8 caracters at least').not().isEmpty().isLength({ min: 8 }),
] , ( req, res ) => {
    const ers = validationResult(req)
    if(!ers.isEmpty()) {
        return res.json({ ers: ers.array() })
    }

    const { firstname, lastname, photo, birthdate, country, degree, institution, bio, mail, password } = req.body
    User.findOne({ mail }).then(user => {
        if(user) { res.status(400).json({ msg: 'It Already exists an user with this email adress! Try Again' }) }
        else {
            user = new User({
                firstname,
                lastname,
                photo,
                birthdate,
                country,
                degree,
                institution,
                bio,
                mail,
                password
            })
            bcrypt.genSalt( 10, ( err, salt ) => {
                bcrypt.hash( user.password, salt, ( err, hashedPassword ) => {
                    user.password = hashedPassword
                    user.save()
                    
                    const payload = {
                        user: {
                            id: user.id
                        }
                    }
                    jwt.sign( payload, jwtSecret, { expiresIn: 7200000 }, ( err, token ) => {
                        if( err ) throw err
                        res.json({ token })
                    } )
                        
                })
            })
            
        }
    })
    .catch(err => console.log(err.message))
    

})

// ---GET User---
router.get('/:id', ( req, res ) => {
    User.findOne({ user: req.user.id }).then( author => res.json( author ) ).catch( err => console.log( err.message ) )
 })


module.exports = router