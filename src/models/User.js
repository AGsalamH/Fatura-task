const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },

    password: {
        type: String,
         required: true
    },

    phone: {
        type: String,
        required: false
    }
});

// Pre Hook that Checks if this email exists or not before saving it .
userSchema.pre('save', async function (next) {
   if (!this.isModified('username')) { // if value is NOT getting modified
       return next();
   }
   const alreadyExists = await this.collection.findOne({username: this.username});
   if (alreadyExists) { // username already exists ?
       const error = new mongoose.Error('Username already exists!');
       error.statusCode = 400;
       return next(error);
   }
   next();
});

// Hash password before saving it.
userSchema.pre('save', async function (next) {
    if(! this.isModified('password')){
        return next();
    }
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

// Document method 
userSchema.methods.comparePasswords = async function (password) {
    const isCorrect = await bcrypt.compare(password, this.password);
    if (!isCorrect) {
        const error = new Error('Invalid Password!!');
        error.statusCode = 400;
        throw error;
    }
    return isCorrect;
}

// Model method
userSchema.statics.emailExists = async function (email) {
    const user = await this.findOne({email});
    if(!user){
        const error = new mongoose.Error('User not found!');
        error.statusCode = 404;
        throw error;
    }
    return user;
}

module.exports = mongoose.model('User', userSchema);