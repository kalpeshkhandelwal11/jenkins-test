const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
TodoTask = require("./models/details_model");
dotenv.config();
app.use("/static", express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ 'extended': 'true' })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
var glob_email;
var transport = nodemailer.createTransport({
    host: "smtp.stackmail.com",
    port: 465,
    auth: {
        user: "kalpesh@codingbeastz.tech",
        pass: "Kalpesh123"
    }
});

//connection to db
mongoose.set("useFindAndModify", false);

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true, },
    () => {
        console.log("Connected to db!");

        app.listen(3000, () => console.log("Server Up and running"));
    });
var db = mongoose.connection;

app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/sign_up', function(req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var pass = req.body.password;
    var phone = req.body.phone;
    var otp = req.body.otp;
    var verified = "0";
    glob_email = req.body.email;
    const message = {
        from: 'kalpesh@codingbeastz.tech', // Sender address
        to: email, // recipients
        subject: 'otp', // Subject line
        text: 'Your otp is' + otp // Plain text body
    };
    transport.sendMail(message, function(err, info) {
        if (err) {
            console.log(err)
        } else {
            console.log('mail has sent.');
            console.log(info);
        }
    });



    var myData = new TodoTask(req.body);
    const todoTask = new TodoTask({ content: req.body });
    myData.save()
        .then(item => {
            res.redirect("/signup_success");
        })
        .catch(err => {
            console.log(err);
            res.status(400).send("unable to save to database");
        });
});

// GET METHOD
app.get('/visualize', function(req, res) {
    res.render("verify.ejs");
});
app.get('/', function(req, res) {
    res.render("index.ejs");
});
app.get('/signup_success', function(req, res) {
    res.render("signup_success.ejs");
});