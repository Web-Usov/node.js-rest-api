const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema(
    {
        name:{
            type:String,
            required:true,
            maxlength:3,
            minlength:3,
            default:"000"
        },
        people:{
            type:Number,
            required:true,
            min:0,
            max:5,
        },
        withKitten:{
            type:Boolean,
            default:false
        }
    },
    {
        versionKey: false 
    }
)

module.exports = mongoose.model("Room", schema)