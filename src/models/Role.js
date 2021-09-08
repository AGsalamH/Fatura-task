const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }    
});


/**
 * Initialize essential roles for the first time.
 * Only runs once when a collection is first created
 * creates ['user', 'admin', 'moderator']
 * 
 */
roleSchema.statics.initializeRoles = async function() {
    try {
        const count = await this.estimatedDocumentCount();
        if (count) return;
        const user = await new this({name: 'user'}).save();
        console.log('added \'user\' to roles collection ', user);
        const admin = await new this({name: 'admin'}).save();
        console.log('added \'admin\' to roles collection ', admin);
        const moderator = await new this({name: 'moderator'}).save();
        console.log('added \'moderator\' to roles collection ', moderator);
    } catch (error) {
        console.log(error);
    }
}


module.exports = mongoose.model('Role', roleSchema);