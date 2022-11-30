const { validationResult } = require("express-validator");

const validate = (req , res , next) => {

    const error = validationResult(req)
    const errors = [];

    if(error.isEmpty()){
      return next()
    }else{
        error.array().map(err => {
          errors.push(err.msg);
        })

        return res.status(422).json({
          error: errors,
        })
    }

}

module.exports = validate;
