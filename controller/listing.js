const Listing = require("../models/listing");

module.exports.showall = async (req, res) => {
    const data = await Listing.find({});
    res.render("listings/home", { data });
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
    let newlisting = req.body.listings;
    newlisting.owner = req.user._id;
    let listing = new Listing(newlisting);
    await listing.save();
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
    if (data) {
        req.flash("error", "Listing you requested for does not exist!");
    }
    res.render("listings/edit", { data });
};

module.exports.saveEdit = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listings });
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