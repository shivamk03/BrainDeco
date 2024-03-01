const express = require('express');
const Questions = require('../models/Questions');
const router = express.Router();
var random = require('mongoose-simple-random');

router.get('/',async(req,res)=>{
    try{
        const data = await Questions.find().limit(10).skip(random);
        res.json({success:true,data:data});
    }catch(e){
        console.log(e);
        res.json({success:false});
    }
});
module.exports= router;