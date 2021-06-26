const service = require("../service/userService");
const { isEmpty } = require("lodash");
const userModel = require("../model/userModel");
const addressModel = require("../model/addressModel")
const bcrypt = require("bcryptjs");
const tokens = require("../middleware/tokenAccess");

module.exports.register = async (req, res) => {
  try {
    /**
     * validating the req.body payload using express validator
     */
    req
      .checkBody("firstName")
      .isAlpha()
      .withMessage("firstname must have alphabetical characters")
      .isLength({ min: 3 })
      .withMessage("minimum 3 alphabets required in first name");

    req
      .checkBody("lastName")
      .isAlpha()
      .withMessage("lastname must have alphabetical characters")
      .isLength({ min: 3 })
      .withMessage("minimum 3 alphabets required in last name");

    req.checkBody("email").isEmail().withMessage("Email is not valid");

    req
      .checkBody("password")
      .isLength({ min: 3 })
      .withMessage("min 3 alphabets required")
      .isLength({ max: 10 })
      .withMessage("max 10 alphabets are allowed in password");

    const errors = req.validationErrors();

    /**if any validation errors are present in the req payload , error message  will be sent accordingly */
    if (errors) {
      return res
        .status(400)
        .json({ success: false, message: errors, data: null });
    } else {
      const { firstName, lastName, email, password } = req.body;
      const userData = { firstName, lastName, email, password };

      /**
       * Passing user payload to userservice where business logic has to be written
       */
      const userExists = await userModel.user.findOne({ email });
      if (isEmpty(userExists)) {
        const result = await service.register(userData);
        return res.status(201).json({
          success: true,
          message: "User created successfully",
          data: result,
        });
      } else {
        return res.status(409).json({
          success: true,
          message: "User already exists with this email",
          data: userExists,
        });
      }
    }
  } catch (error) {
    console.log("Registration Controller Catch ", error);
    res.status(400).json({
      success: false,
      message: "Error in registration",
      data: null,
    });
  }
};

exports.login = (req, res) => {
  try {
    var details = {};
    req.checkBody("email").isEmail().withMessage("Email is not valid");

    req
      .checkBody("password")
      .isLength({ min: 3 })
      .withMessage("min 3 alphabets required")
      .isLength({ max: 10 })
      .withMessage("max 10 alphabets are allowed in password");

    var errors = req.validationErrors();
    var response = {};
    if (errors) {
      (response.success = false),
        (response.errors = errors),
        res.status(400).send(errors);
    } else {
      let userLoginData = {
        email: req.body.email,
        password: req.body.password,
      };
      service.login(userLoginData, (err, result) => {
        if (err || result === undefined) {
          (response.sucess = false),
            (response.error = err),
            (response.message = "Incorrect password")
            res.status(400).send(response);
        } else {
          const payload = {
            _id: result._id,
          };
          var gentoken = tokens.generateToken(payload);

          console.log(gentoken);

          (response.sucess = true),
            (response.result = result),
            (response.token = gentoken),
            res.status(200).send(response);
        }
      });
    }
  } catch (error) {
    console.log(" Login Controller Catch ");
    res.status(400).send({
      success: false,
      message: "Login Controller catch",
    });
  }
};

exports.saveAddress=async(req,res)=>{
    const result = await addressModel.saveAddress(req.body)
    if(isEmpty(result)){
        res.status(400).json({success:false,message:"Error saving the address",data:null})
    }
    res.status(201).json({success:true,message:"address saved",data:result})

}