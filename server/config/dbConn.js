const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://aniket1:hianiket123@cluster0.z69mafx.mongodb.net/`, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
    } catch (err) {
        console.error(err);
    }
}

module.exports = connectDB