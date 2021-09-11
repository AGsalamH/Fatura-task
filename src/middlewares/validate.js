const { validationResult } = require('express-validator');
/**
 * Middleware: Catches any validation errors.
 * Giving control to the next middleware if no errors occured
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports = (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) { // If no errors occurred.
        return next();
    }

    // Here, There are errors! 
    // Let's Catch 'em!
    
    // Formatting the errors a bit in this array
    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));
  
    return res.status(422).json({
      errors: extractedErrors,
    });
}