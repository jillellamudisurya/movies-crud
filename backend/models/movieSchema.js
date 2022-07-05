const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        rating:{
            type:Number,
            required:true
        },
        cast:{
            type:Array,
            required:true,
        },
        genre:{
            type:String,
            required:true
        },
        release:{
            type:Date,
            required:true
        }
    }
);

const movies = new mongoose.model("movies",movieSchema);

module.exports = movies;