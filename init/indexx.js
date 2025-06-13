const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js");

main().then(()=> {
    console.log("Working");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/resorts');
}

const initDB = async () => {
    await Listing.deleteMany({});
    initdata.data = initdata.data.map((obj) => ({...obj, owner: "6848fe80887845ef87d92cf9"}))
    await Listing.insertMany(initdata.data);
    console.log("data was initialized");
}

initDB();
