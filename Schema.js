const Joi = require('joi');

module.exports.listingSchema = Joi.object({
    listings: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        price: Joi.number().required().min(1),
        img: Joi.string().allow("", null),
        category: Joi.array().items(
            Joi.string().valid(
                "Trending", "Hotel", "iconic cities", "Mountains", "Beach", "Castel",
                "Amazing Pools", "Forest", "Camping", "Snow Destinations",
                "Historical Sites", "Lake View", "Fireplace Cabins"
            )
        ).optional()
    }).required()
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        author: Joi.string().required(),
        rating: Joi.number().required().min(0).max(5),
        comment: Joi.string().required(),
    }).required()
});
