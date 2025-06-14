if(process.env.NODE_ENV != "PRODUCTION"){
    require('dotenv').config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const path = require("path");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const flash = require('connect-flash');
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/users.js");


const listiings = require("./routes/listing.js");
const reeviewss = require("./routes/review.js");
const ussser = require("./routes/user.js");

// sessions use
const sessionOption = {
    secret: "RandomSecret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 15 * 60 * 1000,
        maxAge: 15 * 60 * 1000,
        httpOnly: true,
    }
}

app.use(session(sessionOption));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy({
    usernameField: 'user[username]',
    passwordField: 'user[password]'
}, User.authenticate()));


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// flash use 
app.use((req,res, next) => {
    res.locals.sucess = req.flash("sucess");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine('ejs', ejsMate);


main().then(() => {
    console.log("Working");
}).catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/resorts');
}


app.use("/listings", listiings);
app.use("/listings/:id/review", reeviewss);
app.use("/", ussser);


// app.get("/", (req, res) => {
//     res.send("root is working properly");
// });

app.all(/.*/, (req, res, next) => {
    next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong" } = err;
    console.log(err);
    // res.status(statusCode).send(message)
    res.status(statusCode).render("listings/error", { err, statusCode })
});

app.listen(8080, () => {
    console.log("App is listning on port 8080");
});