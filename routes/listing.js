const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controller/listing.js");
const multer = require('multer');
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });
const Listing = require("../models/listing.js");

// show all listings
router.get("/", wrapAsync(listingController.showall));

//country search
router.get("/country", wrapAsync(async (req, res) => {
  let { search } = req.query;
  const data = await Listing.find({
    country: { $regex: new RegExp(search, 'i') } 
  });
  res.render("listings/home", { data })
}));
//listing route category
router.get("/category/:id", wrapAsync(listingController.showCategory));

//Going to add listings page
router.get("/new", isLoggedIn, (req, res) => {
  res.render("listings/new");
});

//adding listing in all listing.
// router.post("/", isLoggedIn, wrapAsync(listingController.addListing));
router.post(
  "/",
  isLoggedIn,
  upload.single("listings[img]"), // ✅ Must be here
  wrapAsync(listingController.addListing)
);


//see listing details.
router.get("/:id", wrapAsync(listingController.seedetail));

//going to edit listing page
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.goEdit));

//saving edited route
router.put("/:id", isLoggedIn, isOwner, upload.single("listing[img]"), validateListing, wrapAsync(listingController.saveEdit));

//delete listing
router.delete("/:id", isLoggedIn, isOwner, wrapAsync(listingController.deletelisting));

module.exports = router;