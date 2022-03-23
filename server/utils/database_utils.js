const mongoose = require("mongoose");

module.exports.isValidObjectId = (id) => {
    return mongoose.isValidObjectId(id);
}