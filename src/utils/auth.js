const { User } = require('../models');


/**
 * takes user credintial that are required to login
 * @param {string} username 
 * @param {string} password
 * @throws {*} error if username or password are NOT correct 
 * @returns {User} user
 */
const authenticate = async (username, password) => {
    const user = await User.userExist(username);
    await user.comparePasswords(password);
    return user;
}



module.exports = {
    authenticate
}