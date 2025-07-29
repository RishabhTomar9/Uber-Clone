const userModel = require('../models/user.model');

module.exports.createUser = async ({
    firstName,
    lastName,
    emailAddress,
    password,
}) => {
    try {
        if (!firstName || !lastName || !emailAddress || !password) {
            throw new Error('All fields are required');
        }
        
        const user = await userModel.create({
            fullName: {
                firstName,
                lastName,
            },
            emailAddress,
            password,
        });
        
        return user;
    } catch (error) {
        console.error('User creation error:', error);
        throw error;
    }
};