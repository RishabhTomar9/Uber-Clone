const captionModel = require('../models/caption.model');
const captionService = require('../services/caption.service');
const { validationResult } = require('express-validator');

module.exports.registerCaption = async (req, res, next) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {fullName, email, password, color, plate, capacity, vehicleType, lat, lng} = req.body;

    const isCaptionAlreadyExists = await captionModel.findOne({email});
    if(isCaptionAlreadyExists) {
        return res.status(400).json({ message: 'Caption already exists' });
    }

    const hashedPassword = await captionModel.hashPassword(password);

    const caption = await captionService.createCaption({fullName, email, password: hashedPassword, color, plate, capacity, vehicleType, lat, lng});

    const token = caption.generateAuthToken();
    res.cookie('token', token);
    res.status(201).json({
        message: 'Caption created successfully',
        caption,
    });
}



