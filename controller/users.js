const User = require("../models/users.js");

module.exports.signup = async (req, res, next) => {
    try {
        const { Email, username, password } = req.body.user;
        const newUser = new User({ email: Email, username: username });
        const registerUser = await User.register(newUser, password);
        // console.log(registerUser);
        req.login(registerUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("sucess", "Welcome to Wanderlust");
            res.redirect("/listings");
        });
    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/signup");
    }
};

module.exports.login = async (req, res) => {
    req.flash("sucess", "Welcome To Wanderlust!");
    res.redirect(res.locals.redirectURL);
};

module.exports.logout = (req, res, next) => {
    req.logOut((err) => {
        if (err) {
            next(err);
        }
        req.flash("sucess", " Successfully logged Out!");
        res.redirect("/listings");
    });
};