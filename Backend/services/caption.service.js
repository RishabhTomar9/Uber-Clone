const captionModel = require('../models/caption.model');




module.exports.createCaption = async({fullName, email, password, color, plate, capacity, vehicleType, lat, lng}) => {
    if(!fullName.firstName || !email || !password || !color || !plate || !capacity || !vehicleType || !lat || !lng) { 
        throw new Error('All fields are required');
    }
    const caption = await captionModel.create({fullName: {firstName: fullName.firstName, lastName: fullName.lastName}, email, password, vehicle: {color, plate, capacity, vehicleType}, location: {lat, lng}});
    return caption;
}


