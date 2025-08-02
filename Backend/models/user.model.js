const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullName: {
        firstName: {
            type: String,
            required: true,
            minlength: [3, 'First name must be at least 3 characters long'],
            maxlength: [50, 'First name must be less than 50 characters long'],
        },
        lastName: {
            type: String,
            minlength: [3, 'Last name must be at least 3 characters long'],
            maxlength: [50, 'Last name must be less than 50 characters long'],
        },
    },
    emailAddress: {
        type: String,
        required: true,
        unique: true,
        match: [
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            'Please enter a valid email address',
        ],
    },
    password: {
        type: String,
        required: true,
        select: false,
        minlength: [8, 'Password must be at least 8 characters long'],
        maxlength: [100, 'Password must be less than 100 characters long'],
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        match: [/^[0-9]{10,11}$/, 'Please enter a valid phone number'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    socketId: {
        type: String,
        default: null,
    },
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
};

userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};
userSchema.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password, 10);
};

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;