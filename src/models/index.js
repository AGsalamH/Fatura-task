const ROLES = ["user", "admin", "moderator"];


module.exports = {
    User: require('./User'),
    RefreshToken: require('./RefreshToken'),
    BlackList: require('./BlackList'),
    ROLES: ROLES
}