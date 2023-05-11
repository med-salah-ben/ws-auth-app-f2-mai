const {body , validationResult} = require("express-validator");

const registerRules = ()=>[
    body("name" , "Name is required").notEmpty(),
    body("lastName" , "Last Name is required").notEmpty(),
    body("email" , "email should be email!!").isEmail(),
    body("password" , "password most contain 5 car or more").isLength({
        min: 5,
        max: 15
    })
]

const loginRules = ()=>[
    body("email" , "email should be email!!").isEmail(),
    body("password" , "password most contain 5 car or more").isLength({
        min: 5,
        max: 15
    })
]

const validator = (req,res,next)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
    next()
}

module.exports = {validator ,registerRules , loginRules}