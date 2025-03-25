const mongoose = require('mongoose');

const mongoDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://electronicdm565:Test12345@cluster0.q8s2p.mongodb.net/Gofood?retryWrites=true&w=majority&appName=Cluster0');
        console.log('MongoDB Connected...');

        // Wait until the connection is ready
        const db = mongoose.connection.db;
        
        // Fetch food_items collection
        const foodItemsCollection = db.collection('food_items');
        const foodItemsData = await foodItemsCollection.find({}).toArray();

        // Fetch food_Category collection
        const foodCategoryCollection = db.collection("food_Category");  // ✅ Fixed collection name
        const foodCategoryData = await foodCategoryCollection.find({}).toArray(); // ✅ Fetch data

        // Store data in global variables
        global.food_items = foodItemsData;
        global.foodCategory = foodCategoryData;

        console.log("Food Items & Food Categories Loaded Successfully");

    } catch (error) {
        console.error('MongoDB Connection Failed:', error);
        process.exit(1);
    }
};

module.exports = mongoDB;
