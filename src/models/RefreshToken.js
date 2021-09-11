const mongoose = require("mongoose");
// const { v4: uuidv4 } = require('uuid');

// const { JWT_REFRESH_EXPIRATION } = require('.');

const refreshTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  userId: { type: String, required: true },
});

// refreshTokenSchema.statics.generateToken = async function (user) {
//     const token = uuidv4();
//     let expiryDate = new Date();
//     expiryDate.setSeconds(
//         expiryDate.getSeconds() + JWT_REFRESH_EXPIRATION
//     );

//     const refreshToken = new this({
//         token,
//         expiryDate: expiryDate,
//         user: user._id
//     });

//     const savedRefreshToken = await refreshToken.save();
//     return savedRefreshToken.token;
// }
// refreshTokenSchema.statics.verifyToken = token => token.expiryDate.getTime() < new Date().getTime();

module.exports = mongoose.model("RefreshToken", refreshTokenSchema);
