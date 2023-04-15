const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const User = require('../models/user');


//user registartion
router.post('/register', async(req, res) => {
    try{
        console.log("reqbody " + req.query.email);
        
        const newUser = new User({
            firstName: req.query.firstName,
            lastName:req.query.lastName,
            phoneNumber:req.query.phoneNumber, 
            aadharNumber:req.query.aadharNumber, 
            userAge: req.query.userAge,
            userGender: req.query.userGender,
            userPinCode: req.query.userPinCode,
            address1:req.query.address1,
            epicNumber: req.query.epicNumber,
            address2: req.query.address2,
            userState: req.query.userState,
            userDistrict: req.query.userDistrict,
            username: req.query.userName,
            email: req.query.email
        });

        console.log(newUser);

        const user = await newUser.save();
        res.status(200).json(user);
    }

    catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});


//JWT Login
router.post('/login', async(req, res, next) =>{
    try {
        const user = await User.findOne({ email: req.body.email });
        !user && res.status(404).json("user not found");
    
        const validPassword = (req.body.password == user.password);
        !validPassword && res.status(400).json("wrong password");

        const token = jwt.sign({
            email: user.email,
            isAdmin: user.isAdmin
        }, 
        'JWT_secret_key',
        {
            expiresIn:"24h"
        });


        res.status(200).json(
            {user, token}
            );
      } catch (err) {
        res.status(500).json(err)
      }
});
module.exports = router;