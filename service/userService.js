const bcrypt = require("bcryptjs");
const saltRounds = 10;
const userModel = require("../model/userModel");
const { isEmpty } = require("lodash");

module.exports.register = async (userPayload) => {
  console.log("service", userPayload);
  try {
    /**
     * Hash the password before saving
     */
    let { password } = userPayload;
    userPayload.password = await bcrypt.hash(password, saltRounds);

    const result = userModel.createUser(userPayload);
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// module.exports.login=(payload,existingUserInfo)=>{
//     try{
//         console.log(payload.password,existingUserInfo.password);
//         bcrypt.compare(payload.password,existingUserInfo.password,(error,result)=>{
//             if(!result){
//                 return "password incorrect"
//             }
//         })
        
//     }
//     catch(error){
//         console.log('error in login',service);
//         return error
//     }

// }

exports.login = (userData, callback) => {
    try {
        userModel.login(userData, (err, result) => {
            if (err || result === undefined) {
                console.log("Service Error")
                return callback(err)
            }
            else {
                console.log("Service In ", result)
                return callback(null, result)
            }
        })
    }
    catch (err) {
        console.log("Catch Error In services ", err)
        return callback(err)
    }
}