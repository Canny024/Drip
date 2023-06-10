const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://drip_login:u7ita5FOqEJe2KgX@cluster0.scakc63.mongodb.net/?retryWrites=true&w=majority`, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
    } catch (err) {
        
        console.error(err);
    }
}

module.exports = connectDB