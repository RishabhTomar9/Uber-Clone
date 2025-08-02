const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const captionController = require('../controllers/caption.controllers');
const { authCaption } = require('../middlewares/auth.middlewares');


router.post('/register', [
    body('fullName.firstName').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('fullName.lastName').isLength({ min: 3 }).withMessage('Last name must be at least 3 characters long'),
    body('phone').isLength({ min: 10, max: 10 }).withMessage('Phone number must be 10 digits'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
    body('vehicle.color').isLength({ min: 3 }).withMessage('Color must be at least 3 characters long'),
    body('vehicle.plate').isLength({ min: 3 }).withMessage('Plate must be at least 3 characters long'),
    body('vehicle.capacity').isInt({ min: 1 }).withMessage('Capacity must be at least 1'),
    body('vehicle.vehicleType').isIn(['car', 'bike', 'auto', 'other']).withMessage('Invalid vehicle type'),
    body('location.lat').isFloat({ min: -90, max: 90 }).withMessage('Latitude must be between -90 and 90'),
    body('location.lng').isFloat({ min: -180, max: 180 }).withMessage('Longitude must be between -180 and 180'),
], captionController.registerCaption);

router.post('/login',[
    body('email').isEmail().withMessage('Invalid email address') ,
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
], captionController.loginCaption);

router.get('/profile', authCaption, captionController.getCaptionProfile);

router.get('/logout', authCaption, captionController.logoutCaption);

module.exports = router;