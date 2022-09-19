const mongoose = require("mongoose");

const goalSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    text: {
        type: String,
        required: [true, "Please add a text for the Goal"],
    }
},{
    timestamps: true
});

module.exports = mongoose.model('Goal', goalSchema)