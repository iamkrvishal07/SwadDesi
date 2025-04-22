const mongoose = require("mongoose")

const recipeSchema = mongoose.Schema({
    title:{
        type:String,
        required : true
    },
    ingredients:{
        type:Array,
        required : true
    },
    instructions:{
        type:String,
        required : true
    },
    time:{
        type:String,
    },
    CoverImage:{
        type:String,
        
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }

},{timestamps:true})

const Recipe = mongoose.model("Recipe" ,recipeSchema );
module.exports = Recipe;