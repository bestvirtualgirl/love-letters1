// Connect MongoDb


require('dotenv').config();
console.log(process.env.MONGODB_URI);

// const require  = require('mongoose');
const mongoose = require('mongoose');



// Function connect to MongoDb
const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true
        });
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
};


module.exports = connectDb;