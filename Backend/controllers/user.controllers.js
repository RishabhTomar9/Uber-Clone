const userModel = require('../models/user.model');
const userServices = require('../services/user.services')
const { validationResult } = require('express-validator');

module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { fullName, emailAddress, password } = req.body;

    const hashedPassword = await userModel.hashPassword(password);
    
    const user = await userServices.createUser({
        firstName: fullName.firstName,
        lastName: fullName.lastName,
        emailAddress,
        password: hashedPassword,
    });
    
    const token = user.generateAuthToken();
    res.status(201).json({ message: 'User created successfully', user, token });
}

module.exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    const user = await userModel.findOne({ emailAddress: email }).select('+password');

    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Login successful', user, token: user.generateAuthToken() });
}
