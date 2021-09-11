module.exports = {
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'SHHH_ITS_TOP_SECRET',
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'HIDE_ME',
    ACCESS_TOKEN_EXPIRATION: 600, // 10 mins
    REFRESH_TOKEN_EXPIRATION: '7d' // 1 week

    // For testing
    // ACCESS_TOKEN_EXPIRATION: 20, // 20 secs
    // REFRESH_TOKEN_EXPIRATION: 120 // 2 min

}