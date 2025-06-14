require('dotenv').config({ path: __dirname + '/../.env' }); // If running from init folder
const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');

// Verify environment variables are loaded
console.log("MAP_TOKEN:", process.env.MAP_TOKEN); // Debug check

// Initialize geocoding client after confirming token exists
if (!process.env.MAP_TOKEN) {
  throw new Error("MAP_TOKEN environment variable is not set");
}

const geocodingClient = mbxGeocoding({ accessToken: process.env.MAP_TOKEN });

main().then(() => {
    console.log("Connected to DB");
}).catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/resorts');
}

const initDB = async () => {
    await Listing.deleteMany({});
    
    // Process each listing to add geocoding data
    const listingsWithGeocode = await Promise.all(
        initdata.data.map(async (obj) => {
            try {
                console.log(`Geocoding: ${obj.location}, ${obj.country}`); // Debug
                
                // Get coordinates from Mapbox
                const response = await geocodingClient.forwardGeocode({
                    query: `${obj.location}, ${obj.country}`,
                    limit: 1
                }).send();

                if (!response.body.features || response.body.features.length === 0) {
                    throw new Error("No features found in geocoding response");
                }

                const geometry = response.body.features[0].geometry;
                
                return {
                    ...obj,
                    owner: "6848fe80887845ef87d92cf9",
                    geometry: geometry
                };
            } catch (err) {
                console.error(`Error geocoding ${obj.location}:`, err.message);
                return {
                    ...obj,
                    owner: "6848fe80887845ef87d92cf9",
                    geometry: {
                        type: "Point",
                        coordinates: [0, 0] 
                    }
                };
            }
        })
    );

    await Listing.insertMany(listingsWithGeocode);
    console.log("Data was initialized with geocoding");
}

initDB();