const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema(
    {
        email:{
            type:String,
            required:true,
            unique:true,
            match:/.+@.+\..+/i
        },
        password:{
            type:String,
            required:true,
            min:4,
            max:16,
            select:false
        },
        createdRooms:[{
            type:Schema.Types.ObjectId,
            ref:'Room'
        }]
    },
    {
        versionKey: false 
    }
)

module.exports = mongoose.model("User", schema)