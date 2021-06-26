const mongoose = require('mongoose')
const Schema = mongoose.Schema

var addressSchema = mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: ['true', 'User Id Required'],
        ref: 'userSchema'
    },
    city: {
        type: String,
        required: ['true', 'city required']
    },
    state: {
        type: String,
        required: ['true', 'state required']
    },
    country: {
        type: String,
        required: ['true', 'country required']

    },
   
    pinCode: {
        type: Number,

    },
},

    {

        timestamps: true
    });

module.exports.address = mongoose.model('Address', addressSchema)

module.exports.saveAddress=async(payload)=>{
    console.log('payload',payload);
    const address = new address({
        "userId":payload.firstName,
        "city":payload.lastName,
        "state":payload.email,
        "country":payload.password,
        "pinCode":payload.pinCode
    })

    try{
        const result=await address.save()
        return result
    }
    catch(error){
        console.log(error)
        return error
    }
    
}