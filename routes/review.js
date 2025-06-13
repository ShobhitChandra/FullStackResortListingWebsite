const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const { isAuthor, isLoggedIn, validateReview } = require("../middleware.js");
const reviewController = require("../controller/review.js");

//add review
router.post("/", isLoggedIn, validateReview , wrapAsync(reviewController.addreview));

//delete review
router.delete("/:reviewid", isLoggedIn, isAuthor, wrapAsync(reviewController.deletereview));

module.exports = router;