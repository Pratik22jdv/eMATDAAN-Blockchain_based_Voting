const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

const router = express.Router();

const User = require('../models/user');

var nodemailer = require('nodemailer');


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

        const user = await User.findOne({ email: req.query.email });

        if (!user) res.json({ auth: false, message: "user not found" });
        else {

            const validPassword = (req.query.password == user.password);

            if (!validPassword) res.json({ auth: false, message: "wrong password" });

            else {

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
    const user = await User.findOne({ email: req.query.adminEmail });
    if (user && user.admin) {
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
});

//get user route
router.get("/:userId", async (req, res) => {
    const userId = req.params.userId;
    try {
        const user = await User.findById(userId);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});



//Generate random number as password
function generateRandomNumber() {
    var minm = 100000;
    var maxm = 999999;
    return Math.floor(Math
        .random() * (maxm - minm + 1)) + minm;
}


//Mail
async function mail(userEmail, votePassword) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    // let testAccount = await nodemailer.createTestAccount();
    // console.log(userEmail);

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: "gmail",
        // true for 465, false for other ports
        auth: {
            user: process.env.USER_EMAIL, // generated ethereal user
            pass: process.env.USER_PASS, // generated ethereal password
        },
    });

    let message = {
        from: 'jpratikr22@gmail.com', // sender address
        to: userEmail, // list of receivers
        subject: "eMATDAAN approval", // Subject line
        text: "Hello User?", // plain text body
        html: "<b>Hello user, You have been approved to vote in conducted Election. " + votePassword + " pasword.</b>", // html body
    };

    // send mail with defined transport object
    let info = await transporter.sendMail(message);

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}





//Update user
//Approve user by admin by generating OTP and sendig email on approval
router.put("/approvalChange/:userId", async (req, res) => {
    const userId = req.params.userId;
    try {
        
        const user = await User.findById(userId);
        let votePassword = generateRandomNumber();
        console.log(votePassword);

        await mail(user.email, votePassword).catch(console.error);
        const passUser = await User.updateOne({ _id: userId }, { $set: { votePassword: votePassword } });

        const approveUser = await User.updateOne({ _id: userId }, { $set: { approved: true } });

        // console.log(a);
        res.status(200).json({ user, votePassword });
    } catch (err) {
        res.status(500).json(err);
    }

})
module.exports = router;