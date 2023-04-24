const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const User = require('../models/user');


//user registartion
router.post('/register', async (req, res) => {
    try {


        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNumber: req.body.phoneNumber,
            aadharNumber: req.body.aadharNumber,
            userAge: req.body.userAge,
            userGender: req.body.userGender,
            userPinCode: req.body.userPinCode,
            address1: req.body.address1,
            epicNumber: req.body.epicNumber,
            address2: req.body.address2,
            userState: req.body.userState,
            userDistrict: req.body.userDistrict,
            email: req.body.email
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
        // console.log(req.session);
        console.log("email" + req.query.email);
        const user = await User.findOne({ email: req.query.email });

        if (!user) res.json({ auth: false, message: "user not found" });
        else {

            const validPassword = (req.query.password == user.password);

            if (!validPassword) res.json({ auth: false, message: "wrong password" });

            else {

                console.log(user.email);

                const token = jwt.sign({
                    email: user.email,
                    isAdmin: user.isAdmin
                },
                    'JWT_secret_key',
                    {
                        expiresIn: 300,
                    });
                // req.session.user = user;
                res.status(200).json(
                    { auth: true, user, token }
                );
            }
        }
    } catch (err) {
        res.status(500).json(err)
    }
});

const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"];
    console.log(token);
    if (!token) {
        res.send("No Token");
    }
    else {
        jwt.verify(token, "JWT_secret_key", (err, decode) => {
            if (err) {
                console.log(err);
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


//Admin auth
const authAdmin = async (req, res, next) => {
    const user = await User.findOne({email: req.query.adminEmail});
    if(user && user.admin){
        next();
        return;
    }
    res.send({
        auth: false,
        message: "Unauthorized Access"
    });
}

//Fetch User
router.get('/all', authAdmin, async (req, res) => {
    try {
        const list = await User.find();
        res.status(200).json(list);
        // console.log(user);
    } catch (err) {
        res.status(500).json(err);
    }
})
module.exports = router;