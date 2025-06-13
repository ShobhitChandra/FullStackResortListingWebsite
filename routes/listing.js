const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controller/listing.js");


// show all listings
router.get("/", wrapAsync(listingController.showall));

//Going to add listings page
router.get("/new", isLoggedIn, (req, res) => {
    res.render("listings/new");
});

//adding listing in all listing.
router.post("/", isLoggedIn, validateListing, wrapAsync(listingController.addListing));

//see listing details.
router.get("/:id", wrapAsync(listingController.seedetail));

//going to edit listing page
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.goEdit));

//saving edited route
router.put("/:id", isLoggedIn, isOwner, validateListing, wrapAsync(listingController.saveEdit));

//delete listing
router.delete("/:id", isLoggedIn, isOwner, wrapAsync(listingController.deletelisting));

module.exports = router;