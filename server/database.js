const mongoose = require("mongoose")

module.exports = async function connect() {
    mongoose.set('debug', true);
    try {
        mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("> Connected to MongoDB");
    } catch (error) {
        console.error("> Could connect to mongodb");
        process.exit(1)
    }

}


