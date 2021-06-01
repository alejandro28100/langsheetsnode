const mongoose = require("mongoose")
/*********************** Mongoose Configuration *******************************/

mongoose
    .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error(err);
    });

mongoose.set('debug', true);


