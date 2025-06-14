const Listing = require("../models/listing");
const ExpressError = require("../utils/ExpressError.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.showall = async (req, res) => {
    const data = await Listing.find({});
    res.render("listings/home", { data });
};

module.exports.showCategory = async (req, res) => {
    let { id: categoryid } = req.params;

    const data = await Listing.find({
        category: { $regex: new RegExp(`^${categoryid}$`, 'i') }
    });

    if (data.length === 0) {
        req.flash("error", "No listing is there for given Category");
        return res.redirect("/listings");
    }

    res.render("listings/category", { data });
};

module.exports.addListing = async (req, res, next) => {
    // let {title, description, img, price, location, country} = req.body;
    // await Listing.insertOne({
    //     title: title,
    //     description: description,
    //     img: img,
    //     price: price,
    //     location: location,
    //     country: country,
    // });
    let response = await geocodingClient.forwardGeocode({
        query: req.body.listings.location,
        limit: 1
    })
        .send()

    let newlisting = req.body.listings || {};
    if (req.file) {
        newlisting.img = {
            url: req.file.path,
            filename: req.file.filename
        };
    }
    newlisting.owner = req.user._id;
    newlisting.geometry = response.body.features[0].geometry;
    let listing = new Listing(newlisting);
    let savelisting = await listing.save();
    console.log(savelisting);
    req.flash("sucess", "New listing Added!");
    res.redirect("/listings");
};

module.exports.seedetail = async (req, res) => {
    let { id } = req.params;
    const curlisting = await Listing.findOne({ _id: id }).populate({
        path: "reviews", populate: {
            path: "author"
        }
    }).populate("owner");
    if (!curlisting) {
        req.flash("error", "Listing you requested for does not exist!");
    } else {
        res.render("listings/show", { curlisting });
    }
};

module.exports.goEdit = async (req, res) => {
    let { id } = req.params;
    const data = await Listing.findById(id);
    // res.send("Ok");
    if (!data) {
        req.flash("error", "Listing you requested for does not exist!");
    }
    let orignalimageURL = data.img.url;
    orignalimageURL = orignalimageURL.replace("/upload", "/upload/w_250")
    res.render("listings/edit", { data, orignalimageURL });
};

module.exports.saveEdit = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, {
        ...req.body.listings,
        owner: req.user._id // or retain original owner from DB
    });

    if (!listing) {
        throw new ExpressError("Listing not found!", 404);
    }
    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.img = { url, filename };
        await listing.save();
    }
    // res.send("ok");
    req.flash("sucess", "New listing Sucessfully Updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.deletelisting = async (req, res) => {
    let { id } = req.params;
    let deleatedListing = await Listing.findByIdAndDelete(id);
    console.log(deleatedListing);
    req.flash("error", "New listing Sucessfully Deleated!");
    res.redirect("/listings");
};