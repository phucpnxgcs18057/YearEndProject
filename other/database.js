const mongoose = require("mongoose");
const MONGODB_URI = 'mongodb+srv://admin:test123456@projectcluster.g4aec.mongodb.net/project?retryWrites=true&w=majority';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log(`Database is running on ${conn.connection.host}:${conn.connection.port}`);

        return conn;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    connectDB
}
