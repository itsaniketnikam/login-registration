const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require("bcryptjs");


//creating  a schema
const userSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'first name is required'],
    },
    lastName: {
        type: String,
        required: [true, 'first name is required']
    },
    email: {
        type: String,
        required: [true, 'first name is required']
    },
    password: {
        type: String,
        required: [true, 'first name is required']
    }
},
    {
        timestamps: true
    }
)
 var user =mongoose.model('User', userSchema)
module.exports.user = mongoose.model('User', userSchema)

module.exports.createUser=async(payload)=>{
    console.log('payload',payload);
    const newUser = new user({
        "firstName":payload.firstName,
        "lastName":payload.lastName,
        "email":payload.email,
        "password":payload.password
    })

    try{
        const result=await newUser.save()
        return result
    }
    catch(error){
        console.log(error)
        return error
    }
    
}

module.exports.login = (data, callback) => {
    try {
        user.findOne({ email: data.email }, (err, result) => {
            //console.log("What is in result",result)
            if (err) {
                console.log("Please Enter Valid Email Address..!!")
                callback(err)
            }
            else if (result === null) {
                console.log("Invalid User")
                return callback(err)
            }
            // else if(result.isVerified === null || !result.isVerified  ){
            // //  console.log("verify or not ",model.isVerified)
            //     console.log("verify First..!!");
            //     callback(err)
            // }
            else {

                bcrypt.compare(data.password, result.password, (err, res) => {

                    if (!res) {
                        console.log("Password Incorrect");
                        return callback(err)
                    }
                    else {
                        console.log("Login Successfully");
                        return callback(null, result)
                    }
                })

            }
        })
    }
    catch (err) {
        console.log("Error in login catch block", err);
        res(err)
    }
}

