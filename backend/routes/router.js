const express = require('express');
const router = express.Router();

const movies = require('../models/movieSchema')

router.get('/',async(req,res)=>{
    try{
        res.send("Hello World")
    }
    catch(err){
        res.send(err)
    }
})

router.post('/addmovie',async(req,res)=>{
    console.log("REQ Body::",req.body);
    const{name,rating,cast,genre,release}=req.body;

    if(!name||!rating||!cast||!genre||!release){
        res.status(404).json("Enter complete Data")
    }
    try{
        const addMovie = new movies(
            {
                name,rating,cast,genre,release
            }
        )

        await addMovie.save();
        res.status(201).json(addMovie)
        console.log("Adding Movie",addMovie)
    }
    catch(err){
        res.status(500).send(err)
    }
})


router.get("/getmovies",async(req,res)=>{
    try{
        const moviesData=await movies.find();

        res.status(201).json(moviesData)

    }
    catch(err){
        res.status(500).send(err)
    }
})

router.delete('/deletemovie/:id',async(req,res)=>{
    try{
        const {id}=req.params;
        const data = await movies.deleteOne({_id:id})
        res.status(201).json(data)
    }
    catch(err){
        res.status(500).send(err)
    }
})

router.get('/getmovie/:id',async(req,res)=>{
    try{
        const {id} = req.params
        
        const singleMovie = await movies.findById({_id:id})
        res.status(201).json(singleMovie)
    }
    catch(err){
        res.status(500).send(err)
    }
})

router.put('/updatemovie/:id',async(req,res)=>{
    try{
        // console.log("I am update")
        const {id} = req.params;
        const updatedMovie = await movies.updateOne({_id:id},{$set:{"name":req.body.name,"rating":req.body.rating,"cast":req.body.cast,"genre":req.body.genre,"release":req.body.release}})
        console.log(updatedMovie)
        res.status(201).json(updatedMovie)
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})

module.exports = router;