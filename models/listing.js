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
        url: String,
        filename: String,
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
    },
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true,
        }
    },
    category: [{
        type: String,
        enum: ["Trending", "Hotel", "iconic cities", "Mountains", "Beach", "Castel", "Amazing Pools", "Forest", "Camping", "Snow Destinations", "Historical Sites", "Lake View", "Fireplace Cabins"],
        required: true,
    }]
});

listSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await review.deleteMany({ _id: { $in: listing.reviews } });
    }
})

const Listing = mongoose.model("Listing", listSchema);
module.exports = Listing;