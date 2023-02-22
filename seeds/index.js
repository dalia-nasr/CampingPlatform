const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

const dbUrl =  "mongodb+srv://dalianasrmongo:dalia@cluster0.gscvlxh.mongodb.net/?retryWrites=true&w=majority" || 'mongodb://localhost:27017/yelp-camp';

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(dbUrl);
  console.log("Seed Connection Open!");
}


const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) +10;
        const camp = new Campground({
            author: '6356fb81a2ea3a19b703a5d3',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eos quidem suscipit nihil, sed eius accusamus impedit distinctio, asperiores hic officia fugiat nesciunt magnam soluta neque qui, dolorum culpa corrupti delectus.',
            price,
            geometry: {
              type: "Point",
              coordinates: [
                cities[random1000].longitude,cities[random1000].latitude
              ]
          },
            images: [
                {
                  url: "https://res.cloudinary.com/dt8z9j0dm/image/upload/v1666644940/YelpCamp/yqqjfjg2hqkmooqdsemz.webp",
                  filename: "YelpCamp/lvgnrtijpaskx2eul6j7",
                },
                {
                  url: "https://res.cloudinary.com/dt8z9j0dm/image/upload/v1666644938/YelpCamp/zokhrifndjxruxh7ovu2.webp",
                  filename: "YelpCamp/ntpimzf3twnsgox53ejm",
                  }
            ]
        })
        await camp.save();
    }
}

seedDB();