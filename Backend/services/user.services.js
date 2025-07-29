const userModel = require('../models/user.model');

module.exports.createUser = async ({
    firstName,
    lastName,
    emailAddress,
    password,
}) => {
    if (!firstName || !lastName || !emailAddress || !password) {
        throw new Error('All fields are required');
    }
    const user = userModel.create({
        fullName: {
            firstName,
            lastName,
        },
        emailAddress,
        password,
    });
    return user;
};