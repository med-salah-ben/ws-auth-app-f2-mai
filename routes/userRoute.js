const router = require("express").Router();
const controllers = require("../controllers/userControllers");
const isAuth = require("../middleware/isAuth");
const {validator , registerRules , loginRules} = require("../middleware/validator")

//method post
router.post("/register", registerRules() , validator, controllers.userRegister);
router.post("/login",loginRules() , validator, controllers.userLogin);
router.get("/",isAuth, (req,res)=>{
    // console.log("router Req : " , req)
    return res.status(200).send({user:req.user})
});
// router.get("/hello", isAuth , (req,res)=>{
//     res.status(200).send({msg:"hello world!!!" , x : req.user})
// })

module.exports = router;