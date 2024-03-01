const mongoose = require('mongoose');
const {Schema} = mongoose;

const QuestionsData = new Schema({
    question:{
        type:String,
        required:true
    },
    A:{
        type:String,
        required: true
    },
    B:{
        type:String,
        required: true
    },
    
    C:{
        type:String,
        required: true
    },
    D:{
        type:String,
        required: true
    },answer:{
        type:String,
        required:true
    }
});
const Questions = mongoose.model('questions',QuestionsData);
module.exports = Questions;