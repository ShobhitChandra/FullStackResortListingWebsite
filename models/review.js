const { required, ref } = require("joi");
const mongoose = require("mongoose");
const {Schema} = mongoose;

const reviewSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    comment: {
        type: String,
        required: true,   
    },
    rating: {
        type: Number,
        max: 5,
        min: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

const review = mongoose.model("review", reviewSchema);
module.exports = review;