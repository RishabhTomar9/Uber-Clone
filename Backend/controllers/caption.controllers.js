const captionModel = require('../models/caption.model');
const captionService = require('../services/caption.service');
const { validationResult } = require('express-validator');
const BlacklistToken = require('../models/blacklistToken.model');

module.exports.registerCaption = async (req, res, next) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, email, password, phone, vehicle, location } = req.body;

    const isCaptionAlreadyExists = await captionModel.findOne({email});
    if(isCaptionAlreadyExists) {
        return res.status(400).json({ message: 'Caption already exists' });
    }

    try {
        const hashedPassword = await captionModel.hashPassword(password);

        const caption = await captionService.createCaption({
            fullName,
            email,
            password: hashedPassword,
            phone,
            vehicle,
            location
        });

        const token = caption.generateAuthToken();
        res.cookie('token', token);
        res.status(201).json({
            message: 'Caption created successfully',
            caption,
            token,
        });
    } catch (error) {
        console.error('Error in registerCaption:', error);
        res.status(500).json({ 
            message: 'Internal server error',
            error: error.message 
        });
    }
    
}

module.exports.loginCaption = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;

    const caption = await captionModel.findOne({email});
    if (!caption) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await caption.comparePassword(password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = caption.generateAuthToken();
    res.cookie('token', token);
    res.status(200).json({
        token,
        message: 'Login successful',
        caption,
    });
}

module.exports.getCaptionProfile = async (req, res, next) => {
    const caption = req.caption;
    res.status(200).json({
        caption,
    });
}

module.exports.logoutCaption = async (req, res, next) => {
    const token = req.cookies.token || req.header('Authorization')?.split(' ')[1];
    await BlacklistToken.create({ token });
    res.clearCookie('token');
    res.status(200).json({
        message: 'Logout successful',
    });
}
