const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const User = require('../models/user');


//user registartion
router.post('/register', async (req, res) => {
    try {
        console.log("reqbody " + req.query.email);

        const newUser = new User({
            firstName: req.query.firstName,
            lastName: req.query.lastName,
            phoneNumber: req.query.phoneNumber,
            aadharNumber: req.query.aadharNumber,
            userAge: req.query.userAge,
            userGender: req.query.userGender,
            userPinCode: req.query.userPinCode,
            address1: req.query.address1,
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
router.post('/login', async (req, res, next) => {
    try {
        // console.log("email" + req.query.email);
        const user = await User.findOne({ email: req.query.email });

        if (!user) res.json({auth:false, message: "user not found" });
        else {

            const validPassword = (req.query.password == user.password);

            if (!validPassword) res.json({auth:false, message: "wrong password" });

            else {

                console.log(user.email);

                const token = jwt.sign({
                    email: user.email,
                    isAdmin: user.isAdmin
                },
                    'JWT_secret_key',
                    {
                        expiresIn: "24h"
                    });


                res.status(200).json(
                    { auth:true, user, token }
                );
            }
        }
    } catch (err) {
        res.status(500).json(err)
    }
});

const verifyJWT = (req, res, next) => {
    console.log(req.query.token);
    console.log(req.query.extra);
    const token = req.query.token;
    console.log(token);
    if (!token) {
        res.send("No Token");
    }
    else {
        jwt.verify(token, "JWT_secret_key", (err, decode) => {
            if (err) {
                res.json({ auth: false, message: "Auth Failed" })
            }
            else {
                req.email = decoded.id;
                next();
            }
        })
    }
}

router.get('/isAuth', verifyJWT, (req, res) => {
    res.send("Authenticated");
})

router.get('/login', async (req, res) => {
    if (req.session.user) {
        res.send({ isLoggedIn: true, user: req.session.user });
    }
    else res.send({ isLoggedIn: false });
});
module.exports = router;