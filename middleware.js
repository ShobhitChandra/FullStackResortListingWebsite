const wrapAsync = require("./utils/wrapAsync.js");
const Listing = require("./models/listing");
const review = require("./models/review.js");
const {listingSchema, reviewSchema} = require("./Schema.js");
const ExpressError = require("./utils/ExpressError.js");

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash("error", "You must be logged in first!");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveredirectURL = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.redirectURL = req.session.returnTo;
    } else {
        res.locals.redirectURL = "/listings";
    }
    next();
};

module.exports.isOwner = wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    let data = await Listing.findById(id);
    if(!data.owner._id.equals(res.locals.currUser._id)){
        req.flash("error", "You are not authorized"); 
        return res.redirect(`/listings/${id}`);
    }
    next();
});

module.exports.isAuthor = wrapAsync(async (req, res, next) => {
    let { id, reviewid } = req.params;
    let data = await review.findById(reviewid);

    if (!data.author.equals(res.locals.currUser._id)) {
        req.flash("error", "You are not authorized");
        return res.redirect(`/listings/${id}`);
    }

    next();
});


module.exports.validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);

    if (error) {
        throw new ExpressError(400, error);
    } else {
        next();
    }
};

module.exports.validateReview = (req, res, next) => {
    let {err} = reviewSchema.validate(req.body);

    if(err){
        throw new ExpressError(400, err);
    } else {
        next();
    }
};