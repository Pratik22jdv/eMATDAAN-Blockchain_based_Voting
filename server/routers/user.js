const express = require('express');
const router = express.Router();

const User = require('../models/user');


//user registartion
router.post('/register', async(req, res) => {
    console.log();
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

module.exports = router;