const mongoose = require("mongoose");
const review = require("./review.js");
const { Schema } = mongoose;

const listSchema = new mongoose.Schema({
    title: {
        type: String,
        maxLength: 100,
        required: true,
    },
    description: {
        type: String,
    },
    img: {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0EaBVRRURoogcnVPiyPIDE_mgzJERgX9Ccg&s",
        set: (v) => v === "" ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0EaBVRRURoogcnVPiyPIDE_mgzJERgX9Ccg&s" : v,
    },
    price: {
        type: Number,
        min: 1,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'review',
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

listSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await review.deleteMany({ _id: { $in: listing.reviews } });
    }
})

const Listing = mongoose.model("Listing", listSchema);
module.exports = Listing;