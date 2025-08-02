const captionModel = require('../models/caption.model');



module.exports.createCaption = async ({ fullName: { firstName, lastName }, email, password, phone, vehicle: { color, plate, capacity, vehicleType }, location: { lat, lng } }) => {
    if (
      !firstName ||
      !lastName ||
      !phone ||
      !email ||
      !password ||
      !color ||
      !plate ||
      !capacity ||
      !vehicleType ||
      typeof lat !== 'number' ||
      typeof lng !== 'number'
    ) {
      throw new Error('All fields are required');
    }
  
    const caption = await captionModel.create({
      fullName: {
        firstName,
        lastName
      },
      email,
      password,
      phone,
      vehicle: {
        color,
        plate,
        capacity,
        vehicleType
      },
      location: {
        lat,
        lng
      }
    });
  
    return caption;
  };
  
