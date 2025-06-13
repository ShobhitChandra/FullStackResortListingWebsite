const Listing = require("../models/listing");
const review = require("../models/review.js");

module.exports.addreview = async (req, res, next) => {
    const {id} = req.params;
    let listing = await Listing.findById(id);
    let newReview = new review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("sucess", "New Review Added");
    res.redirect(`/listings/${id}`);
};

module.exports.deletereview = async (req, res, next) => {
    let {id, reviewid} = req.params;
    await review.findByIdAndDelete(reviewid);
    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewid}});
    req.flash("error", "Review Sucessfully Deleated");
    res.redirect(`/listings/${id}`);
};